const { User, AddTeammate } = require('../models/User'); 

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register Controller
  exports.register = async (req, res) => {
  const { firstName, lastName, email, username, password, confirmPassword, role } = req.body;

  try {
    // Validate password confirmation
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    // Check if the email or username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

   
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashedPassword,
      role
    });

   
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('Registration error:', err); 
    res.status(500).json({ message: 'Registration failed' });
  }
};



exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
