const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.MONGOOSE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connected successfully");
    
      require('../models/Subsection'); 
    })
    .catch((error) => {
      console.log("DB connected issue");
      console.error(error);
      process.exit(1);
    });
};
