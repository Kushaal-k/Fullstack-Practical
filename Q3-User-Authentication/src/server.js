require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware ----------
app.use(express.json());

// ---------- Routes ----------
app.use("/", authRoutes);

// ---------- Health check ----------
app.get("/", (_req, res) => {
  res.json({ message: "User Authentication API is running" });
});

// ---------- Start server ----------
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
