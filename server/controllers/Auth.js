const bcrypt = require("bcrypt");
const OTP = require("../models/OTP");
const User = require("../models/User");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
require("dotenv");

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "email is absent",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({
        success: false,
        message: "User already exist",
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    let result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const otpBody = await OTP.create({ email, otp });
    console.log("OTP -> ", otpBody);

    return res.status(200).json({
      success: true,
      message: "Otp create successfully",
    });
  } catch (error) {
    console.log("error: ", error);
    return res.status(400).json({
      success: false,
      message: "Error while sending otp",
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp ||
      !accountType ||
      !phoneNumber
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "consfirm password could not match",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "user already exist",
      });
    }

    const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log("recent Otp -> ", recentOtp[0].otp);
    if (otp === recentOtp[0].otp) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const profile = await Profile.create({
        gender: null,
        DOB: null,
        about: null,
      });
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
        accountType,
        additionalDetails: profile._id,
        image: `https://api.dicebear.com/6.x/initials/svg?seed=${firstName}${lastName}`,
      });
      console.log("New User -------> ", newUser);
      return res.status(200).json({
        success: true,
        message: "SignUp successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid otp",
      });
    }
  } catch (error) {
    console.log("error in signup controller: ", error);
    return res.status(401).json({
      success: false,
      message: "Error during signup",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist, signup first",
      });
    }

    if (await bcrypt.compare(password, existingUser.password)) {
      const payload = {
        email: existingUser.email,
        id: existingUser._id,
        accountType: existingUser.accountType,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "72h",
      });

      existingUser.token = token;
      existingUser.password = undefined;

      return res.status(200).json({
        success: true,
        message: "User Loged in successfully",
        token,
        existingUser,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Wrong Password",
      });
    }
  } catch {
    return res.status(400).json({
      success: false,
      message: "error during Login",
    });
  }
};
