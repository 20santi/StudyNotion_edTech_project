const mongoose = require("mongoose");

const Subsection = new mongoose.Schema({
  SubsectionName: {
    type: String,
    required: true,
  },

  SubsectionDescription: {
    type: String,
    required: true,
  },

  video: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Subsection", Subsection);