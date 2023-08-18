const User = require("../models/User");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const { uploadImage } = require("../utils/imageUploader");
require("dotenv");

exports.profileUpload = async (req, res) => {
  try {
    const file = req.files.image;
    const id = req.user.id;

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "Please select a image",
      });
    }

    const uploadedImage = await uploadImage(
      file,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    const updateUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        image: uploadedImage.secure_url,
      },
      { new: true }
    );

    if (!uploadedImage) {
      return res.status(400).json({
        success: false,
        message: "Error while upload",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      data: updateUser,
    });
  } catch (error) {
    console.log(
      "Error in profileUpload function in Profile controler: ",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Could not upload Image",
    });
  }
};

exports.profileUpdate = async (req, res) => {
  try {
    const id = req.user.id;
    const { firstName, lastName, dateOfBirth, phoneNumber, gender, about } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !phoneNumber ||
      !gender ||
      !about
    ) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
      },
      { new: true }
    );

    const updatedProfile = await Profile.findByIdAndUpdate(
      user.additionalDetails,
      {
        DOB: dateOfBirth,
        about: about,
        gender: gender,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(
      "error in Profile controler in profileUpload function: ",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Error ocured during profile update",
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const {id, password, newPassword} = req.body;
    console.log("id ", id);

    if (!newPassword || !password) {
      return res.status(404).json({
        success: false,
        message: "Please profide new password and old password",
      });
    }

    const user = await User.findById(id);
    if(!user) {
      return res.status(500).json({
        success: false,
        message: "User does not found"
      })
    }

    if (bcrypt.compare(password, user.password)) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const response = await User.findByIdAndUpdate(id, {
        password: hashedPassword,
      }, {new: true});
    } else {
      return res.status(500).json({
        success: false,
        message: "Incorrect password",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password update successfully",
    });
  } catch (error) {
    console.log(
      "Error in updatePassword function in Profile controler: ",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Error while update password",
    });
  }
};
