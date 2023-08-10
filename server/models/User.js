const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  courses: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  image: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
    enum: ["Admin", "Student", "Instructor"],
  },
  token:{
    type:String,
  }
});

module.exports = mongoose.model("User", userSchema);
