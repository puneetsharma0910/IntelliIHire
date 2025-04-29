// Dependencies
import clientProfile_model from "../models/clientProfile.model.js";
import freelancerProfile_model from "../models/freelancerProfile.model.js";

// Validate profile image upload
const validateProfileImage = (req, res, next) => {
  if (!req.file) {
    return res.status(400).send({
      error: "No file uploaded"
    });
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(req.file.mimetype)) {
    return res.status(400).send({
      error: "Invalid file type. Only JPEG, PNG and GIF are allowed"
    });
  }

  if (req.file.size > 5 * 1024 * 1024) { // 5MB limit
    return res.status(400).send({
      error: "File size too large. Maximum size is 5MB"
    });
  }

  next();
};

// Validate bio update
const validateBioUpdate = (req, res, next) => {
  if (!req.body.bio) {
    return res.status(400).send({
      error: "Bio is required"
    });
  }

  if (req.body.bio.length > 500) {
    return res.status(400).send({
      error: "Bio cannot exceed 500 characters"
    });
  }

  next();
};

// Validate skills update
const validateSkillsUpdate = (req, res, next) => {
  if (!req.body.skills || !Array.isArray(req.body.skills)) {
    return res.status(400).send({
      error: "Skills must be provided as an array"
    });
  }

  if (req.body.skills.length > 20) {
    return res.status(400).send({
      error: "Maximum 20 skills allowed"
    });
  }

  next();
};

// Validate languages update
const validateLanguagesUpdate = (req, res, next) => {
  if (!req.body.languages || !Array.isArray(req.body.languages)) {
    return res.status(400).send({
      error: "Languages must be provided as an array"
    });
  }

  if (req.body.languages.length > 10) {
    return res.status(400).send({
      error: "Maximum 10 languages allowed"
    });
  }

  next();
};

// Validate social media links
const validateSocialLinks = (req, res, next) => {
  const { github, linkedin, twitter } = req.body;
  
  if (github && !github.startsWith('https://github.com/')) {
    return res.status(400).send({
      error: "Invalid GitHub URL"
    });
  }

  if (linkedin && !linkedin.startsWith('https://www.linkedin.com/')) {
    return res.status(400).send({
      error: "Invalid LinkedIn URL"
    });
  }

  if (twitter && !twitter.startsWith('https://twitter.com/')) {
    return res.status(400).send({
      error: "Invalid Twitter URL"
    });
  }

  next();
};

// Validate hourly rate update
const validateHourlyRate = (req, res, next) => {
  const { hourlyRate } = req.body;

  if (hourlyRate === undefined || hourlyRate === null) {
    return res.status(400).send({
      error: "Hourly rate is required"
    });
  }

  if (typeof hourlyRate !== 'number' || isNaN(hourlyRate)) {
    return res.status(400).send({
      error: "Hourly rate must be a number"
    });
  }

  if (hourlyRate < 0) {
    return res.status(400).send({
      error: "Hourly rate cannot be negative"
    });
  }

  if (hourlyRate > 1000) {
    return res.status(400).send({
      error: "Hourly rate cannot exceed 1000"
    });
  }

  next();
};

const profile_middleware = {
  validateProfileImage,
  validateBioUpdate,
  validateSkillsUpdate,
  validateLanguagesUpdate,
  validateSocialLinks,
  validateHourlyRate
};

export default profile_middleware;
