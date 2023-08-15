const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const category = await Category.create({
      name: name,
      description: description,
    });
    console.log("Category: ", category);
    return res.status(200).json({
      success: true,
      message: "Category created succssfully",
    });
  } catch (error) {
    console.log("Error while create Category: ", error);
    return res.status(400).json({
      success: false,
      message: "Category could not created",
    });
  }
};

exports.showAllCategory = async (req, res) => {
  try {
    const allCategory = await Category.find(
      {},
      { name: true, description: true }
    );
    return res.status(200).json({
      success: true,
      message: "All Category fetch successfully",
      data: allCategory,
    });
  } catch (error) {
    console.log("Error while fetch all Category");
    return res.status(404).json({
      success: false,
      message: "Error in allCategory function in Category controller",
    });
  }
};
