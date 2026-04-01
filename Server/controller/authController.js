// const User = require("../models/userModel");
// const bcrypt = require("bcryptjs");

// exports.registerUser = async (req, res) => {

//   const {
//     name,
//     username,
//     email,
//     password,
//     confirmPassword
//   } = req.body;

//   // validation
//   if (password !== confirmPassword) {
//     return res.status(400).json({
//       message: "Passwords do not match"
//     });
//   }

//   // check existing user
//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     return res.status(400).json({ 
//       message: "User already exists"
//     });
//   }

//   // hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await User.create({
//     name,
//     username,
//     email,
//     password: hashedPassword
//   });

//   res.status(201).json(user);
// };

const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// ================= REGISTER =================
exports.register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // check existing user
    const userExists = await User.findOne({ email });

    if (userExists)   
      return res.status(400).json({ message: "User already exists" });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User Registered Successfully"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ================= LOGIN =================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({ message: "Invalid Credentials" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(400).json({ message: "Invalid Credentials" });

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