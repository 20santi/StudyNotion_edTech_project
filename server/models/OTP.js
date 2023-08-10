const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/emailTemplate");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5,
  },
});

const sendOtp = async (email, otp) => {
  try {
    const response = await mailSender(
      email,
      "verification email",
      emailTemplate(otp)
    );

    console.log("response after send mail :-> ", response);
  } catch (error) {
    // Handle the error properly here
    console.error("Error while sending OTP email:", error);
    throw error;
  }
};

OTPSchema.pre("save", async function (next) {
  if (this.isNew) {
    await sendOtp(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);
