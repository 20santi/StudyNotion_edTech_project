const express = require("express");
const router = express.Router();

const { sendOtp, signup, login } = require("../controllers/Auth");
const { ResetPasswordToken, ResetPassword } = require("../controllers/ResetPassword");

router.post("/signup", signup);
router.post("/login", login);
router.post("/sendOtp", sendOtp);

router.post("/reset-password-token", ResetPasswordToken);
router.post("/reset-password", ResetPassword);

module.exports = router;