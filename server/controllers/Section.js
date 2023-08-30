const Course = require("../models/Course");
const Section = require("../models/Section");
const Subsection = require("../models/Subsection");

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;
    if (!sectionName || !courseId) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    const section = await Section.create({
      sectionName: sectionName,
    });

    const updateCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: { section: section._id },
      },
      { new: true })
      .populate({
        path: "section",
        populate: {
          path: "subsection",
        },
      }).exec();

    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      course: updateCourse,
    });
  } catch (error) {
    console.log("Error while create section: ", error);
    return res.status(500).json({
      success: false,
      message: "Error in createSection controller",
    });
  }
};

exports.editSection = async (req, res) => {
  try {
    const { sectionId, sectionName } = req.body;
    if (!sectionId || !sectionName) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        sectionName: sectionName,
      },
      { new: true }
    ).populate("subsection");

    return res.status(200).json({
      success: true,
      message: "Section name edited successfully",
      data: newSection,
    });
  } catch (error) {
    console.log("Error in editSection function in Section controller");
    return res.status(500).json({
      success: false,
      message: "Section name could not edit",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;

    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    await Subsection.deleteMany({ _id: { $in: section.subsection } });

    await Section.findByIdAndDelete(sectionId);

    const result = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: { section: sectionId },
      },
      { new: true }
    ).populate({
      path: "section",
      populate: {
        path: "subsection",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: result,
    });
  } catch (error) {
    console.log("Error while deleting Section in section coltroller: ", error);
    return res.status(500).json({
      success: false,
      message: "Section could not delete",
    });
  }
};
