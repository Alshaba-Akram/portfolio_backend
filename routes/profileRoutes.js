const express = require("express");
const {
  getProfile,
  createOrUpdateProfile,
  deleteProfile,
} = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/")
  .get(protect, getProfile)
  .post(protect, createOrUpdateProfile)
  .delete(protect, deleteProfile);

module.exports = router;
