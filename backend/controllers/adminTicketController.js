const LandingUser = require("../models/LandingUser");
const User = require("../models/User");

// Get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await LandingUser.find().populate("assignedTo", "username email designation");
    res.status(200).json({ tickets });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Assign ticket to member
exports.assignTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { memberId } = req.body;

    const ticket = await LandingUser.findById(ticketId);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    const member = await User.findById(memberId);
    if (!member || member.designation !== "member") {
      return res.status(400).json({ message: "Invalid member" });
    }

    ticket.assignedTo = memberId;
    ticket.status = "assigned";
    await ticket.save();

    res.status(200).json({ message: "Ticket assigned successfully", ticket });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
