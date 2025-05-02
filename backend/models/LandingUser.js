const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
  sender: { type: String, enum: ['user', 'admin', 'member'], required: true },
  text: { type: String },
  timestamp: { type: Date, default: Date.now }
});

const landingUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    ticketNumber: { type: String, required: true, unique: true },
    createdTime: { type: String, required: true },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["open", "assigned", "resolved", "missed"],
      default: "open",
    },
    messages: [messageSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("LandingUser", landingUserSchema);
