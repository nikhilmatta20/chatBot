
const { User, AddTeammate } = require('../models/User'); 
const LandingUser = require('../models/LandingUser');


const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

exports.getMembers = async (req, res) => {
  try {
    const members = await User.find({ role: "member" }); 
    res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching members", error);
    res.status(500).json({ message: "Error fetching members" });
  }
};

exports.getAdmins = async (req, res) => {
  try {
    const members = await User.find({ role: "admin" }); 
    res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching members", error);
    res.status(500).json({ message: "Error fetching admin" });
  }
};

exports.getTeam = async (req, res) => {
  try {
    const members = await User.find({ role: { $in: ["admin", "member"] } }); 
    res.status(200).json(members);
  } catch (error) {
    console.error("Error fetching members", error);
    res.status(500).json({ message: "Error fetching admin/members" });
  }
};

exports.addTeammate = async (req, res) => {
  try {
    const {  username, email, password, role } = req.body;

    if(req.user.role !== 'admin') {
      return res.status(403).json({ message: "Only admins can add teammates" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newTeammate = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });

    await newTeammate.save();
    res.status(201).json({ message: "teammate added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Couldn't add teammate" });
  }
};

exports.editMember = async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, username, email, password, role } = req.body;

    console.log("Authenticated user:", req.user); 

   
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not authenticated or missing id" });
    }

    console.log("Authenticated user's id:", req.user.id); 

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.user.role !== "admin" && req.user.id !== userId) {
      return res.status(403).json({ message: "Unauthorized to edit this profile" });
    }

    // Update allowed fields
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.email = email;

    // Only admin can update role
    if (req.user.role === "admin" && role) {
      user.role = role;
    }

    // Update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save user
    await user.save();
    res.status(200).json({ message: "Profile updated. Please log in again." });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};



exports.getTeamMember = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('username email firstName lastName');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const { userId } = req.params; // Get the userId from the URL

    // Only admins can delete users
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can delete profiles' });
    }

    // Find and delete the user
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


exports.getAssignedTickets = async (req, res) => {
  try {
    const userId = req.user.id;

    const tickets = await LandingUser.find({ assignedTo: userId })
      .populate('assignedTo', 'username email')
      .sort({ createdAt: -1 });

    res.status(200).json(tickets);
  } catch (err) {
    console.error("Error fetching assigned tickets:", err);
    res.status(500).json({ message: "Server error" });
  }
};
