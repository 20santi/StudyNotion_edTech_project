const express = require("express");
const router = express.Router();

const { auth } = require("../middlewares/auth");
const { profileUpload, profileUpdate, updatePassword } = require("../controllers/Profile");

router.put("/profileUpload",auth, profileUpload);
router.put("/profileUpdate",auth, profileUpdate);
router.post("/updatePassword", updatePassword);

module.exports = router;