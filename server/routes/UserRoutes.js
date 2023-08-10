const express = require("express");
const router = express.Router();

const { sendOtp, signup, login } = require("../controllers/Auth");

router.post("/signup", signup);
router.post("/login", login);
router.post("/sendOtp", sendOtp);

module.exports = router;