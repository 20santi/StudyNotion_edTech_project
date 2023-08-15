const express = require("express");
const router = express.Router();

const { auth, isAdmin, isStudent, isInstructor } = require("../middlewares/auth");
const { createCategory, showAllCategory } = require("../controllers/Category");

router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategory", showAllCategory);

module.exports = router;