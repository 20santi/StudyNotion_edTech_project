const jwt = require("jsonwebtoken");
require("dotenv");

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      (req.header("Authorization") &&
        req.header("Authorization").replace("Bearer ", ""));

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is missing",
      });
    }
    console.log("token: ----> ", token);

    //verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
      console.log("token:---------> ", decode);
      req.user = decode;
    } catch (error) {
      console.log("error while decode token in auth middleware: ", error);
      return res.status(404).json({
        success: false,
        message: "Token is invalid",
      });
    }

    next();
  } catch (error) {
    console.log("Error in auth middleware: ", error);
    return res.status(400).json({
      success: false,
      message: "Error in auth middleware",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(404).json({
        success: false,
        message: "This is protected route for admin",
      });
    }
    next();
  } catch {
    return res.status(400).json({
      success: false,
      message: "Account type could not read",
    });
  }
};

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(404).json({
        success: false,
        message: "This is protected route for Student",
      });
    }
    next();
  } catch {
    return res.status(400).json({
      success: false,
      message: "Account type could not read",
    });
  }
};

exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(404).json({
        success: false,
        message: "This is protected route for Instructor",
      });
    }
    next();
  } catch {
    return res.status(400).json({
      success: false,
      message: "Account type could not read",
    });
  }
};
