const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendOTPEmail = require("../utils/sendOTPEmail");

// ─── Helper: generate 6-digit OTP ───────────────────────────────────────────
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();


// ═══════════════════════════════════════════════════════════════════
// REGISTER
// ═══════════════════════════════════════════════════════════════════
exports.register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({ name, username, email, password: hashedPassword });

    res.status(201).json({ message: "User Registered Successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ═══════════════════════════════════════════════════════════════════
// LOGIN — Step 1: verify credentials → send OTP to email
// ═══════════════════════════════════════════════════════════════════
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid Credentials" });

    // 2. Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Invalid Credentials" });

    // 3. Generate OTP and save to DB (expires in 5 minutes)
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min
    await user.save();

    // 4. Send OTP email
    await sendOTPEmail(user.email, otp);

    res.json({
      message: "OTP sent to your email",
      email: user.email   // send back so frontend can pass it to verify step
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ═══════════════════════════════════════════════════════════════════
// VERIFY OTP — Step 2: check OTP → issue JWT
// ═══════════════════════════════════════════════════════════════════
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    // Check OTP match
    if (user.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    // Check expiry
    if (user.otpExpiresAt < new Date())
      return res.status(400).json({ message: "OTP has expired" });

    // Clear OTP fields
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    // Issue JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ═══════════════════════════════════════════════════════════════════
// RESEND OTP
// ═══════════════════════════════════════════════════════════════════
exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "User not found" });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    await sendOTPEmail(user.email, otp);

    res.json({ message: "OTP resent successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
