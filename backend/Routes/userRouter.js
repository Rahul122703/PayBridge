const express = require("express");
const { UserModel } = require("../Models/User");
const verifyToken = require("../Middlewares/verifyToken");

const router = express.Router();

router.get("/school", verifyToken, async (req, res) => {
  try {
    const users = await UserModel.find({ role: "school" }).select("-password"); 
    res.status(200).json({
      success: true,
      data: users,
      message: "Fetched all users with role 'school'",
    });
  } catch (err) {
    console.error("Error fetching school users:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: err.message,
    });
  }
});

module.exports = router;
