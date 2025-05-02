const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  ticketNumber: { type: String, required: true },  
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  status: { type: String, default: 'Unresolved' },
  createdAt: { type: Date, required: true },
  
});

module.exports = mongoose.model('Ticket', ticketSchema);


