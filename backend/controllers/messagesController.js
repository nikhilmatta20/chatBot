const LandingUser = require("../models/LandingUser");  
 const Message = require("../models/Message");  


// Controller to handle user message creation
exports.createUserMessage = async (req, res) => {
  try {
    const { name, email, phone, message, ticketNumber } = req.body;
    console.log('Received user message:', req.body);  

    let existingUser = await LandingUser.findOne({ ticketNumber });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this ticket number already exists.' });
    }

    const user = new LandingUser({
      name,
      email,
      phone,
      message,
      ticketNumber,
      createdTime: new Date().toString(),
    });

    await user.save();

    res.status(201).json({ message: "User message saved successfully", data: user });
  } catch (error) {
    console.error('Error saving user message:', error);
    res.status(500).json({ message: 'Error saving user message' });
  }
};


 

// Controller to push admin messages
exports.pushAdminMessage = async (req, res) => {
  try {
    const { ticketNumber, message } = req.body;

    // Find the user associated with this ticket number
    const user = await LandingUser.findOne({ ticketNumber });

    if (!user) {
      return res.status(404).json({ message: 'User not found for this ticket' });
    }

    // Create an admin message linked to this user
    const adminMessage = new Message({
      user: user._id,  
      sender: "admin",  
      text: message,
      ticketNumber,     
    });

    await adminMessage.save(); 

    res.status(201).json({ message: 'Admin response saved successfully', data: adminMessage });
  } catch (error) {
    console.error('Error saving admin response:', error);
    res.status(500).json({ message: 'Error saving admin response' });
  }
};


// Get messages for a ticket
exports.getMessagesByTicket = async (req, res) => {
  try {
    const { ticketNumber } = req.params;

   
    const messages = await Message.find({ ticketNumber })
      .populate('user', 'name email phone');  

    if (messages.length === 0) {
      return res.status(404).json({ message: "No messages found for this ticket" });
    }

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages for ticket", error);
    res.status(500).json({ message: "Error fetching messages", error: error.message });
  }
};
