const Course = require("../models/Course");
const { uploadImage } = require("../utils/imageUploader");

exports.createCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseDescription,
      price,
      category,
      tag,
      benefits,
      instructions,
    } = req.body;

    const picture = req.files.image;

    if (
      !courseDescription ||
      !courseName ||
      !price ||
      !category ||
      !tag ||
      !picture ||
      !benefits ||
      !instructions
    ) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    const instructorId = req.user.id;
    if (!instructorId) {
      return res.status(404).json({
        success: false,
        message: "Provide instructor id",
      });
    }

    const thumbnailImage = await uploadImage(picture, process.env.FOLDER_NAME);

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      price,
      category,
      tag,
      image: thumbnailImage.secure_url,
      benefits,
      instructions,
      activeStatus: "Draft",
      instructor: instructorId,
    });

    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log("Error in createCourse controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Course could not create",
    });
  }
};

