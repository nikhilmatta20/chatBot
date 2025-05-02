
const Ticket = require('../models/ticket');  


let ticketCounter = 0;  // For ticket numbering

exports.createTicket = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    ticketCounter += 1;
    const year = new Date().getFullYear();
    const formattedCounter = ticketCounter.toString().padStart(5, '0');
    const ticketNumber = `Ticket# ${year}-${formattedCounter}`;

    const ticket = new Ticket({
      name,
      phone,
      email,
      message,
      ticketNumber,
      createdAt: new Date()
    });

    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    console.error('Error creating ticket:', error);
    res.status(500).json({ message: 'Error creating ticket',error: error.message });
  }
};

exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    res.status(500).json({ message: 'Failed to fetch tickets' });
  }
};
