const mongoose = require("mongoose");

const Section = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
  },

  sectionDescription: {
    type: String,
    required: true,
  },

  subsection: [
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Subsection"
    }
  ]
});

module.exports = mongoose.model("Section", Section);