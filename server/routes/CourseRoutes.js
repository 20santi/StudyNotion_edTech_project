const express = require("express");
const router = express.Router();

const { auth, isAdmin, isStudent, isInstructor } = require("../middlewares/auth");
const { createCategory, showAllCategory } = require("../controllers/Category");
const { createCourse } = require("../controllers/Course");

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategory", showAllCategory);

router.post("/createCourse",auth, isInstructor, createCourse);

module.exports = router;