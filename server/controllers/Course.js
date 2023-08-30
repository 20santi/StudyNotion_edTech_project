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

exports.editCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseDescription,
      price,
      category,
      tag,
      benefits,
      instructions,
      courseId,
      status
    } = req.body;

    //fetch thumbnail
      var image = null;
      if(req.files) {
        const { Image } = req.files.image;
        image = Image;
      }

    if (!courseId) {
      return res.status(404).json({
        success: true,
        message: "Course ID is needed",
      });
    }

    const newCourse = await Course.findById(courseId);

    if (courseName) {
      newCourse.courseName = courseName;
    }
    if (courseDescription) {
      newCourse.courseDescription = courseDescription;
    }
    if (price) {
      newCourse.price = price;
    }
    if (category) {
      newCourse.category = category;
    }
    if (tag) {
      newCourse.tag = tag;
    }
    if (benefits) {
      newCourse.benefits = benefits;
    }
    if (instructions) {
      newCourse.instructions = instructions;
    }
    if(status) {
      newCourse.activeStatus = status;
    }
    if (image) {
      const uploadedImage = await uploadImage(image, process.env.FOLDER_NAME);
      newCourse.image = uploadedImage.secure_url;
    }

    //save update course
    await newCourse.save();

    const updateCourse = await Course.findById(courseId).populate({
      path: "section",
      populate: {
        path: "subsection",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updateCourse
    })
  } catch (error) {
    console.log("Error while update course in course controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Course could no edit."
    })
  }
};

exports.fetchCourse = async (req, res) => {
  try {
    const { courseID } = req.body;
    if(!courseID) {
      return res.status(400).json({
        success: false,
        message: "Course ID is not fetch from request body"
      })
    }

    const courseDetails = await Course.findById(courseID)
    .populate({
      path: "section",
      populate: {
        path: "subsection"
      }
    })
    console.log("Course id in controller: ", courseID);

    if(!courseDetails) {
      return res.status(500).json({
        success: false,
        message: "Course not found",
      })
    }

    return res.status(200).json({
      success: true,
      message: "Course fetch successfully",
      data: courseDetails
    })
  } catch {
    return res.status(500).json({
      success: false,
      message: "Course details could not fetch"
    })
  }
}

exports.fetchAllCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;
    if(!instructorId) {
      return res.status(404).json({
        success: false,
        message: "Instructor id is not found"
      })
    }
    const courses = await Course.find({instructor: instructorId});
    if(!courses) {
      return res.status(404).json({
        success: false,
        message: "Courses not found"
      })
    }

    return res.status(200).json({
      success: true,
      message: "Courses are fetched successfully",
      data: courses
    })
  } catch(error) {
    console.log("Error while fetched all courses in course controller: ", error);
    return res.status(500).json({
      success: false,
      message: "Courses could not fetched"
    })
  }
}

// exports.deleteCourse = async (req, res) => {
//   try {
//       const { courseId } = req.body;
//       if(!courseId) {
//           return res.status(404).json({
//               success: false,
//               message: "Course ID is not present"
//           })
//       }
//       // find course 
//       const course = await Course.findById(courseId);

//       // delete section and subsection
//       for(let i; i<course.section.length; i++) {
//           for(let j; j<i.subsection.length; j++) {
//               await SubSection.findByIdAndDelete(j._id);
//           }
//           await Section.findByIdAndDelete(i._id);
//       }

//       // delete course
//       await Course.findByIdAndDelete(courseId);
      
//       //return response
//       return res.status(200).json({
//           success: true,
//           message: "Course delted successfully"
//       })

//   } catch(error) {
//       console.log("Error while delete course in course controller: ", course);
//       return res.status(500).json({
//           success: false,
//           message: "Course could not delete"
//       })
//   }
// }
