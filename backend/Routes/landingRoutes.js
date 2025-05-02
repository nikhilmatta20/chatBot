// // landingRoutes.js
// const express = require("express");
// const router = express.Router();
// const { createLandingTicket, submitUserMessage, getUserMessages, replyToUser, assignTicket } = require("../controllers/landingController");

// // Define your routes
// router.post("/submit", createLandingTicket);
// router.post("/submit-message", submitUserMessage);  // Ensure this line is correct
// router.get("/messages", getUserMessages);
// router.post("/reply/:userId", replyToUser);
// router.put("/assign/:id", assignTicket);

// module.exports = router;
const express = require("express");
const router = express.Router();
const { 
  createLandingTicket, 
  submitUserMessage, 
  getUserMessages, 
  replyToUser, 
  assignTicket,
  getAllTickets,
  getResolvedTickets,
  getUnresolvedTickets,
  updateStatus 
} = require("../controllers/landingController");

// Define routes

// Submit a new landing ticket with the first message
router.post("/submit", createLandingTicket); 

// Submit a user message (either creating a new ticket or adding to an existing one)
router.post("/submit-message", submitUserMessage);  // This line is correct!

// Get all messages for a user by email & phone
router.get("/messages", getUserMessages);

// Admin replies to a user's ticket
router.post("/reply/:userId", replyToUser);  // Ensure this corresponds to reply-to-user functionality

// Assign a ticket to a member (update the ticket's 'assignedTo' field)
router.put("/assign/:id", assignTicket);
router.put('/update-status/:id', updateStatus);

router.get("/tickets", getAllTickets);
  
router.get('/tickets/resolved', getResolvedTickets);
router.get('/tickets/unresolved', getUnresolvedTickets);

module.exports = router;
