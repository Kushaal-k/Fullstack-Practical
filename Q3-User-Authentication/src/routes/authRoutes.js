const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

/** POST /register — create a new user account */
router.post("/register", register);

/** POST /login — authenticate and receive a JWT */
router.post("/login", login);

module.exports = router;
