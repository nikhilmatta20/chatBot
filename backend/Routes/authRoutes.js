const express = require("express");
const { register, loginUser } = require("../controllers/authController");
const { getMembers, getAdmins, getTeam, addTeammate,editMember, getTeamMember,deleteMember,getAssignedTickets } = require('../controllers/registrationController');  
const authenticate = require("../middlewares/authMiddleware");
const { checkMissedTickets,getWeeklyMissedChats,
  getDailyMissedChats } = require('../controllers/checkMissedTickets');


const router = express.Router();

// Protected route example
router.get("/protected", authenticate, (req, res) => {
  res.json({ message: `Hello ${req.user.role}, you're authenticated!`, user: req.user });
});


router.get('/members', getMembers);
router.get('/admins', getAdmins);
router.get('/team', getTeam);

//add teammate
router.post('/add-teammate', authenticate, addTeammate);

//edit teammate
router.put('/edit/:userId', authenticate, editMember); 

//get teammate
router.get('/team/:userId', getTeamMember);

//delete teammate
router.delete('/delete/:userId', authenticate, deleteMember);

// Check missed tickets

router.post('/check-missed', checkMissedTickets);

// get weekly missed chats count
router.get('/missed-chats/weekly', getWeeklyMissedChats);

//  get daily missed chats count
router.get('/missed-chats/daily', getDailyMissedChats);

router.get("/tickets/assigned-to", authenticate, getAssignedTickets);



// Test route
router.get("/ping", (req, res) => {
  res.send("Auth route is alive");
});

// Register route
router.post("/register", register);

// Login route
router.post("/login", loginUser);  // Use the correct loginUser function

module.exports = router;
