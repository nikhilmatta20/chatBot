const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "member"], default: "member" },
}, { timestamps: true });

const addTeammateSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "member"], default: "member" },
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
const AddTeammate = mongoose.model('AddTeammate', addTeammateSchema);

module.exports = { User, AddTeammate };
