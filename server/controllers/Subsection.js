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
      data: updateSection
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
