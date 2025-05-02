const express = require('express');
const router = express.Router();
const { createUserMessage, pushAdminMessage, getMessagesByTicket } = require('../controllers/messagesController');

// Route to store user messages
router.post('/messages', createUserMessage);

// Route to add admin response
router.post('/messages/admin', pushAdminMessage);
router.get('/messages/ticket/:ticketNumber', getMessagesByTicket);


module.exports = router;
