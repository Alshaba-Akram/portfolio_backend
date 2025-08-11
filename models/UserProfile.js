const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  link: String,
});

const UserProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  skills: [String],
  projects: [ProjectSchema],
  github: String,
});

module.exports = mongoose.model("UserProfile", UserProfileSchema);
