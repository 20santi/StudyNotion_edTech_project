const express = require("express");
const router = express.Router();

const { auth, isAdmin, isStudent, isInstructor } = require("../middlewares/auth");
const { createCategory, showAllCategory } = require("../controllers/Category");
const { createCourse } = require("../controllers/Course");
const { createSection, editSection } = require("../controllers/Section");
const { createSubSection } = require("../controllers/Subsection");

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategory", showAllCategory);

router.post("/createCourse",auth, isInstructor, createCourse);
router.post("/createSection",auth, isInstructor, createSection);
router.put("/editSection",auth, isInstructor, editSection);
router.post("/createSubsection", auth, isInstructor, createSubSection);

module.exports = router;