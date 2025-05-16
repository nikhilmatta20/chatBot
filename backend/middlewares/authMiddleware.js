
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  console.log("Auth middleware called");

  // Checking for the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded); 


    req.user = {
      id: decoded.id || decoded._id,  
      role: decoded.role,
      username: decoded.username,
    };

    console.log("User from token:", req.user);

 
    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

module.exports = authenticate;
