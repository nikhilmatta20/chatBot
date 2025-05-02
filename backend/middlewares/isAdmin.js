const authenticate = require("./authMiddleware"); // Assuming you have your authenticate middleware here

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: You are not an admin" });
  }
  next();
};

module.exports = isAdmin;
