const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');
const moment = require('moment');
const authenticate = require("../middlewares/authMiddleware"); 
const isAdmin = require("../middlewares/isAdmin"); 
const LandingUser = require("../models/LandingUser");


// POST route to create a ticket
router.post('/tickets', async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    // Get the current date and time
    const now = moment();  // This gives us the current moment in the correct timezone

    // Format the time as hh:mm AM/PM (12-hour format)
    const formattedTime = now.format('hh:mm A');  // Example: "01:50 PM"

    // Get the current date in the format YYYYMMDD
    const year = now.year();
    const month = String(now.month() + 1).padStart(2, '0');  // Month is 0-indexed
    const day = String(now.date()).padStart(2, '0');  // Day of the month

    // Count how many tickets are created today
    const todayStart = new Date(now.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }));
    const todayEnd = new Date(now.set({ hour: 23, minute: 59, second: 59, millisecond: 999 }));

    const ticketsTodayCount = await Ticket.countDocuments({
      createdAt: { $gte: todayStart, $lte: todayEnd }
    });

    // Generate ticket number with leading zeros for the count
    const ticketSerial = String(ticketsTodayCount + 1).padStart(3, '0');  // Format: "001", "002", etc.
    const ticketNumber = `${year}-${month}${day}-${ticketSerial}`;

    // Create the ticket with the current formatted time
    const ticket = new Ticket({
      ticketNumber,
      name,
      phone,
      email,
      message,
      createdAt: now.toDate()  // Store the full date and time in UTC format
    });

    await ticket.save();

    // Send the response with the ticket data, including formatted time
    res.status(201).json({
      ticketNumber,
      name,
      phone,
      email,
      message,
      createdAt: formattedTime  // Return the formatted time to the user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating ticket' });
  }
});


router.get('/tickets', async (req, res) => {
  try {
    const searchQuery = req.query.search || ''; // Get the search query from the URL, default to an empty string if not provided
    const tickets = await Ticket.find({
      ticketNumber: { $regex: searchQuery, $options: 'i' }, // Filter tickets where ticketNumber matches the search query (case-insensitive)
    });
    res.status(200).json(tickets); // Return the filtered tickets as a JSON response
  } catch (error) {
    console.error('Error while fetching tickets:', error.message);
    res.status(500).json({ message: error.message });
  }
});
router.get('/tickets/:ticketId', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error('Error fetching ticket:', error.message);
    res.status(500).json({ message: error.message });
  }
});



// PATCH route to add a message to an existing ticket
router.patch('/tickets/:ticketId/messages', async (req, res) => {
  try {
    const { text, sender } = req.body;
    const ticket = await Ticket.findById(req.params.ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.messages.push({ text, sender });
    await ticket.save();

    res.status(200).json(ticket);
  } catch (error) {
    console.error('Error updating ticket messages:', error);
    res.status(500).json({ message: error.message });
  }
});

router.put("/assign/:ticketId", authenticate, isAdmin, async (req, res) => {
  try {
    const ticket = await LandingUser.findById(req.params.ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const memberId = req.body.memberId; // Assuming the memberId is passed in the request body
    ticket.assignedTo = memberId;
    ticket.status = "assigned"; // Set the status to assigned

    await ticket.save();
    res.status(200).json(ticket); // Send the updated ticket as the response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
