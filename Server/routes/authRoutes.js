// const express = require("express");
// const router = express.Router();
// const { registerUser } = require("../controller/userController");

// router.post("/register", registerUser);

// module.exports = router;    


const express = require("express");
const router = express.Router();

const {
  register,
  login
} = require("../controller/authController");

console.log("Auth Routes Loaded");

router.post("/register", register);
router.post("/login", login);
                  
module.exports = router;