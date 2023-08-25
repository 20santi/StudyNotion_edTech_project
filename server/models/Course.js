const mongoose = require("mongoose");

const CourseSchma = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },

  courseDescription: {
    type: String,
    required: true,
  },

  price: {
    type: String,
    required: true,
  },

  section: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],

  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  studentEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },

  tag: [
    {
      type: String,
      required: true,
    },
  ],

  image: {
    type: String,
    required: true,
  },

  instructions: [
    {
      type: String,
      required: true,
    },
  ],

  activeStatus: {
    type: String,
    required: true,
    enum: ["Active", "Draft"],
  },

  benefits: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Course", CourseSchma);
