const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authMiddleware");
const { addMember } = require("../controllers/teamController");
const {  editMember } = require("../controllers/teamController");

router.put("/edit/:userId", authenticate, editMember);


// admin-only route to add a team member
router.post("/add", authenticate, addMember);

module.exports = router;
