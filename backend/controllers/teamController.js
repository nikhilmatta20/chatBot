const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.addMember = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, role } = req.body;

    // Only admins can add members
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can add members" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

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
    res.status(201).json({ message: "Team member added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
exports.editMember = async (req, res) => {
  try {
    const { userId } = req.params;
    const { firstName, lastName, username, email, password, role } = req.body;

    // Only admins can edit
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can edit profiles" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.email = email;
    user.role = role;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();
    res.status(200).json({ message: "Profile updated. Please log in again." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

