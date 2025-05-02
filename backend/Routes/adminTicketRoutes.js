const express = require("express");
const router = express.Router();
const { getAllTickets, assignTicket } = require("../controllers/adminTicketController");

// Get all tickets
router.get("/tickets", getAllTickets);

// Assign a ticket
router.post("/assign/:ticketId", assignTicket);

module.exports = router;
