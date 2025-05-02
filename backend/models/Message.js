const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "LandingUser", required: true },
  ticketNumber: { type: String, ref: "Ticket", required: true },
  sender: { type: String, enum: ["user", "admin"], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  messages: { type: [String], default: [] }
});

module.exports = mongoose.model("Message", messageSchema);
