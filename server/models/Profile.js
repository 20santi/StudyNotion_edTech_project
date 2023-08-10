const mongoose = require("mongoose");

const Profile = new mongoose.Schema({
    gender:{
        type:String
    },
    DOB:{
        type:String,
    },
    about:{
        type:String,
        trim:true,
    }
})

module.exports = mongoose.model("Profile", Profile);