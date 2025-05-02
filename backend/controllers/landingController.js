
const LandingUser = require("../models/LandingUser");
const { User } = require("../models/User"); 

// Generate ticket number like "2025-0428-123"
function generateTicketNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const randomPart = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
  return `${year}-${month}${day}-${randomPart}`;
}


function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutes} ${ampm}`;
}


exports.createLandingTicket = async (req, res) => {
  try {

    const admin = await User.findOne({ role: "admin" });

    if (!admin) {
      return res.status(500).json({ message: "No admin found to assign the ticket" });
    }

    const { name, email, phone, message } = req.body;
    const createdTime = formatAMPM(new Date());

    // Check if a ticket from the same user already exists
    const existingTicket = await LandingUser.findOne({ name, email, phone });

    if (existingTicket) {
      // Append the new message to the messages array
      existingTicket.messages.push({
        sender: "user",
        text: message,
        timestamp: new Date()
      });

      await existingTicket.save();

      return res.status(200).json({
        message: "Message added to existing ticket",
        ticket: existingTicket
      });
    }

    // If no existing ticket, create a new one
    const ticketNumber = generateTicketNumber();

    const newTicket = new LandingUser({
      name,
      email,
      phone,
      message,
      ticketNumber,
      createdTime,
      assignedTo: admin._id, 
      status: "assigned",  
      messages: [{ sender: "user", text: message, timestamp: new Date() }]
    });

    await newTicket.save();

    res.status(201).json({
      message: "Ticket submitted successfully",
      ticket: newTicket
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Add a message to an existing ticket or create a new one
exports.submitUserMessage = async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    let user = await LandingUser.findOne({ name, email, phone });

    if (!user) {
      const ticketNumber = generateTicketNumber();
      const createdTime = formatAMPM(new Date());

      user = new LandingUser({ 
        name, 
        email, 
        phone, 
        message, 
        ticketNumber, 
        createdTime,
        messages: [{ sender: "user", text: message }]
      });

      await user.save();
    } else {
      user.messages.push({ sender: "user", text: message });
      await user.save();
    }

    res.status(200).json({ message: "Message received", userId: user._id });
  } catch (error) {
    console.error("Error submitting message:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all messages for a user based on email and phone
exports.getUserMessages = async (req, res) => {
  const { email, phone } = req.query;

  try {
    const user = await LandingUser.findOne({ email, phone });

    if (!user) return res.status(404).json({ message: "User not found" });

    const messages = user.messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    res.status(200).json({ user, messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Admin replies to user (append message to ticket)
exports.replyToUser = async (req, res) => {
  const { userId } = req.params;
  const { text } = req.body; // Expecting `text` here

  try {
    const user = await LandingUser.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if the `text` is missing (for debugging purposes)
    if (!text) {
      return res.status(400).json({ message: "'text' is required in the request body" });
    }

    // Directly push the reply to the user's messages array
    user.messages.push({ sender: "admin", text, timestamp: new Date() });
    await user.save();

    res.status(200).json({ message: "Reply sent", messages: user.messages });
  } catch (error) {
    console.error("Error replying to user:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// Assign a ticket to a member
exports.assignTicket = async (req, res) => {
  const { id: ticketId } = req.params;
  const { memberId } = req.body;

  try {
    const member = await User.findById(memberId);
    if (!member || member.role !== 'member') {
      return res.status(400).json({ message: "Invalid member" });
    }

    const ticket = await LandingUser.findByIdAndUpdate(
      ticketId,
      { assignedTo: memberId, status: 'assigned' },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error("Error assigning ticket:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          { ticketNumber: { $regex: search, $options: 'i' } },
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ],
      };
    }

    const tickets = await LandingUser.find(query).sort({ createdAt: -1 });
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const ticket = await LandingUser.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error("Error updating ticket status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getResolvedTickets = async (req, res) => {
  try {
    const tickets = await LandingUser.find({ status: 'resolved' });
    res.json(tickets);
  } catch (err) {
    console.error('Error fetching resolved tickets:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get unresolved tickets (open or assigned)
exports.getUnresolvedTickets = async (req, res) => {
  try {
    const tickets = await LandingUser.find({ status: { $in: ['open', 'assigned'] } });
    res.json(tickets);
  } catch (err) {
    console.error('Error fetching unresolved tickets:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
