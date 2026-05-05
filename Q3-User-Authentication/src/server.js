import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/", authRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "User Authentication API is running" });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
