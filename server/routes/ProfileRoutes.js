const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");
const { profileUpload } = require("../controllers/Profile");

router.put("/profileUpload",auth, profileUpload);

module.exports = router;