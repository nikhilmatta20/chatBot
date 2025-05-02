const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const startMissedTicketsJob = require('./jobs/checkMissedTickets');

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const missedRoutes = require('./Routes/authRoutes');
app.use(missedRoutes);


const landingUserRoutes = require("./Routes/landingRoutes");
app.use("/api/landinguser", landingUserRoutes);


const ticketRoutes = require('./Routes/ticketRoutes');
app.use('/api/tickets', ticketRoutes);

const adminTicketRoutes = require("./Routes/adminTicketRoutes");
app.use("/api/admin", adminTicketRoutes);


const teamRoutes = require("./Routes/teamRoutes");
app.use("/api/team", teamRoutes);



const authRoutes = require("./Routes/authRoutes");
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("Backend is working!");
});

const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected successfully");
    startMissedTicketsJob();
    app.listen(PORT, () => {
      console.log(" Server running on http://localhost:8000");
    });
  })
  .catch((err) => {
    console.error(" DB connection failed:", err);
  });
