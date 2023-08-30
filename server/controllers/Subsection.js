const Subsection = require("../models/Subsection");
const Section = require("../models/Section");
const { uploadImage } = require("../utils/imageUploader");

exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    const video = req.files.video;

    if (!sectionId || !title || !description) {
      return res.status(404).json({
        success: false,
        message: "All fields are needed needed",
      });
    }

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "video is needed",
      });
    }

    const uploadVideo = await uploadImage(video, process.env.FOLDER_NAME);

    const newSubsection = await Subsection.create({
      title: title,
      description: description,
      videoUrl: uploadVideo.secure_url,
      timeDuration: `${uploadVideo.duration}`,
    });

    const updateSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subsection: newSubsection._id } },
      { new: true }
    ).populate("subsection");

    return res.status(200).json({
      success: true,
      message: "Subsection create successfully",
      data: updateSection,
    });
  } catch (error) {
    console.log(
      "Error in createSubsection function in subsection controller: ",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Could not create Subsection",
    });
  }
};

exports.editSubsection = async (req, res) => {
  try {
    const { title, description, sectionId, subsectionId } = req.body;
    const { video } = req.files.video;

    if (!sectionId || !subsectionId) {
      return res.status(404).json({
        success: false,
        message: "sectionId and subsectionId required",
      });
    }

    const subsection = await Subsection.findById(subsectionId);

    if (title) {
      subsection.title = title;
    }

    if (description) {
      subsection.description = description;
    }

    if (req.files && video) {
      const uploadVideo = await uploadImage(video, process.env.FOLDER_NAME);
      subsection.videoUrl = uploadVideo.secure_url;
      subsection.timeDuration = `${uploadVideo.duration}`;
    }

    await subsection.save();

    const updatedSection = await Section.findById(sectionId).populate(
      "subsection"
    );
    return res.status(200).json({
      success: true,
      message: "Subsection edited successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.log(
      "Error while edit subsection in subsection controller: ",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Subsection could not edit",
    });
  }
};

exports.deleteSubsection = async (req, res) => {
  try {
    const { subsectionId, sectionId } = req.body;
    if (!subsectionId || !sectionId) {
      return res.status(404).json({
        success: false,
        message: "subsectionId, sectionId is needed",
      });
    }

    await Subsection.findByIdAndDelete(subsectionId);

    await Section.findByIdAndUpdate(sectionId, {
      $pull: { subsection: subsectionId },
    });

    const updatedSection = await Section.findById(sectionId).populate(
      "subsection"
    );

    return res.status(200).json({
      success: true,
      message: "Subsection deleted successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.log(
      "Error while deleteing subsection in subsection controller: ",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Subsection could not delete",
    });
  }
};
