const express = require("express");
const router = express.Router();

const { auth, isAdmin, isStudent, isInstructor } = require("../middlewares/auth");
const { createCategory, showAllCategory } = require("../controllers/Category");
const { createCourse, editCourse, fetchAllCourses, fetchCourse, deleteCourse } = require("../controllers/Course");
const { createSection, editSection, deleteSection } = require("../controllers/Section");
const { createSubSection, deleteSubsection, editSubsection } = require("../controllers/Subsection");

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategory", showAllCategory);

router.post("/createCourse",auth, isInstructor, createCourse);
router.post("/editCourse",auth, isInstructor, editCourse);
router.post("/fetchCourse",auth, isInstructor, fetchCourse);
router.get("/getAllCourses",auth, isInstructor, fetchAllCourses);
//router.post("/deleteCourse",auth, isInstructor, deleteCourse);

router.post("/createSection",auth, isInstructor, createSection);
router.put("/editSection",auth, isInstructor, editSection);
router.post("/deleteSection",auth, isInstructor, deleteSection);

router.post("/createSubsection", auth, isInstructor, createSubSection);
router.post("/editSubsection", auth, isInstructor, editSubsection);
router.post("/deleteSubsection", auth, isInstructor, deleteSubsection);

module.exports = router;