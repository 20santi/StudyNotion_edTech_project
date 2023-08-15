const User = require("../models/User");
const { uploadImage } = require("../utils/imageUploader");
require("dotenv");

exports.profileUpload = async (req, res) => {
  try {
    const file = req.files.image;
    console.log("ID:------------", req.user);
    const id  = req.user.id;

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
    console.log("Upload image: ", uploadedImage);
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
