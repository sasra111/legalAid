const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/clients", require("./routes/clientRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes"));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Initialize test users (admin, lawyer, client) if not exist
const User = require("./models/User");
const bcrypt = require("bcryptjs");

async function initializeTestUsers() {
  const testUsers = [
    {
      email: "admin@legalaid.com",
      password: "Sasith@123",
      role: "admin",
      name: "Admin User",
      username: "admin",
    },
    {
      email: "lawyer@legalaid.com",
      password: "Sasith@123",
      role: "lawyer",
      name: "Lawyer User",
      username: "lawyer",
    },
    {
      email: "client@legalaid.com",
      password: "Sasith@123",
      role: "client",
      name: "Client User",
      username: "client",
    },
  ];
  for (const userData of testUsers) {
    const existing = await User.findOne({
      $or: [{ email: userData.email }, { username: userData.username }],
    });
    if (!existing) {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      await User.create({ ...userData, password: hashedPassword });
      console.log(`Test user created: ${userData.email} (${userData.role})`);
    }
  }
}

mongoose.connection.once("open", () => {
  initializeTestUsers().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  });
});
