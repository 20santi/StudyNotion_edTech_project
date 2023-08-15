const crypto = require("crypto");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

exports.ResetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide email address",
      });
    }
    const token = crypto.randomBytes(20).toString("hex");
    const user = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        expiresIn: Date.now() + 360000,
      },
      { new: true }
    );
    console.log("New User: ", user);

    const url = `http://localhost:3000/update-password/${token}`;
    await mailSender(
      email,
      "Reset Password Link",
      `Password Reset Link ${url}`
    );
    return res.status(200).json({
      success: true,
      message: "Reset password token send successfully",
    });
  } catch (error) {
    console.log("Error in resetPasswordToken controller: ", error);
    return res.status(404).json({
      success: false,
      message: "Error during send reset password token",
    });
  }
};

exports.ResetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, id } = req.body;
    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const userDetails = await User.findOne({ token: id });

    if (!userDetails) {
      return res.status({
        success: false,
        message: "Token is invalid",
      });
    }

    if (userDetails.expiresIn < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Token expires",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.findOneAndUpdate(
      { token: id },
      { password: hashedPassword },
      { new: true }
    );
    console.log("after update password: ", newUser.password);
    return res.status(200).json({
      success: true,
      message: "Password Updated successfully",
    });
  } catch (error) {
    console.log("Error in resetPassword controller: ", error);
    return res.status(404).json({
      success: false,
      message: "Error while updateing password",
    });
  }
};
