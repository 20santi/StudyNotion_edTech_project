const Course = require("../models/Course")

exports.createCourse = async(req, res) => {
    try {
        const {
            courseName,
            courseDescription,
            price,
            category,
            tag,
            image,
            benefits,
            instructions
        } = req.body

        if(!courseDescription ||
            !courseName ||
            !price ||
            !category ||
            !tag ||
            !image ||
            !benefits ||
            !instructions) {
                return res.status(404).json({
                    success: false,
                    message: "All fields are required"
                })
            }

        const instructorId = req.user.id;
        if(instructorId) {
            return res.status(404).json({
                success: false,
                message: "Provide instructor id"
            })
        }

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            price,
            category,
            tag,
            image,
            benefits,
            instructions,
            activeStatus: "Draft",
            instructor: instructorId
        })  

        return res.status(200).json({
            success: false,
            message: "Course created successfully",
            data: newCourse
        })

    } catch(error) {
        console.log("Error in createCourse controller: ", error);
        return res.status(500).json({
            success: false,
            message: "Course could not create"
        })
    }
}