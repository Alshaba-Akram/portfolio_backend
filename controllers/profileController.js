const UserProfile = require("../models/UserProfile");

// @desc    Get profile for logged in user
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.user._id });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create or update profile
// @route   POST /api/profile
// @access  Private
const createOrUpdateProfile = async (req, res) => {
  const { name, email, skills, projects, github } = req.body;

  try {
    let profile = await UserProfile.findOne({ userId: req.user._id });

    if (profile) {
      // Update
      profile.name = name || profile.name;
      profile.email = email || profile.email;
      profile.skills = skills || profile.skills;
      profile.projects = projects || profile.projects;
      profile.github = github || profile.github;

      await profile.save();
      return res.json(profile);
    }

    // Create new
    profile = new UserProfile({
      userId: req.user._id,
      name,
      email,
      skills,
      projects,
      github,
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete profile
// @route   DELETE /api/profile
// @access  Private
const deleteProfile = async (req, res) => {
  try {
    await UserProfile.findOneAndDelete({ userId: req.user._id });
    res.json({ message: "Profile deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProfile, createOrUpdateProfile, deleteProfile };
