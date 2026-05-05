const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * POST /register
 * Creates a new user after validating required fields and email uniqueness.
 * Hashing is handled by the Mongoose pre-save hook in the User model.
 */
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // ---------- Validate required fields ----------
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // ---------- Check for duplicate email ----------
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }

    // ---------- Create user (password hashed via pre-save hook) ----------
    const user = await User.create({ username, email, password });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    // Mongoose validation errors surface here (e.g. invalid email format)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res
        .status(400)
        .json({ success: false, message: messages.join(", ") });
    }
    console.error("Register error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

/**
 * POST /login
 * Authenticates a user by email + password and returns a JWT on success.
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ---------- Validate required fields ----------
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    // ---------- Find user ----------
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // ---------- Compare password ----------
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    // ---------- Generate JWT (Bonus) ----------
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = { register, login };
