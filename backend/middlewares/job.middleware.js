// Dependencies
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// Database models
import job_model from "../models/job.model.js";
import jobApplication_model from "../models/jobApplications.model.js";
import assignedJob_model from "../models/assignedJob.model.js";
import freelancerProfile_model from "../models/freelancerProfile.model.js";

// Validate job posting
const validateJobPost = (req, res, next) => {
  const { title, location, description, working_hours, preferred_experience, wage, skills, qualification } = req.body;

  if (!title || !location || !description || !working_hours || !preferred_experience || !wage || !skills || !qualification) {
    return res.status(400).send({
      error: "All fields are required"
    });
  }

  if (title.length > 100) {
    return res.status(400).send({
      error: "Title cannot exceed 100 characters"
    });
  }

  if (description.length > 2000) {
    return res.status(400).send({
      error: "Description cannot exceed 2000 characters"
    });
  }

  if (wage < 0) {
    return res.status(400).send({
      error: "Wage cannot be negative"
    });
  }

  if (!Array.isArray(skills) || skills.length === 0) {
    return res.status(400).send({
      error: "At least one skill is required"
    });
  }

  if (skills.length > 20) {
    return res.status(400).send({
      error: "Maximum 20 skills allowed"
    });
  }

  // Validate working hours
  if (typeof working_hours !== 'number' || isNaN(working_hours)) {
    return res.status(400).send({
      error: "Working hours must be a number"
    });
  }

  if (working_hours < 1 || working_hours > 24) {
    return res.status(400).send({
      error: "Working hours must be between 1 and 24"
    });
  }

  // Validate preferred experience
  if (typeof preferred_experience !== 'number' || isNaN(preferred_experience)) {
    return res.status(400).send({
      error: "Preferred experience must be a number"
    });
  }

  if (preferred_experience < 0) {
    return res.status(400).send({
      error: "Preferred experience cannot be negative"
    });
  }

  if (preferred_experience > 50) {
    return res.status(400).send({
      error: "Preferred experience cannot exceed 50 years"
    });
  }

  next();
};

// Validate job application
const validateJobApplication = async (req, res, next) => {
  try {
    const job_id = req.params.job_id;
    const job = await job_model.findOne({ _id: job_id });

    if (!job) {
      return res.status(404).send({
        error: "Job not found"
      });
    }

    if (job.assigned) {
      return res.status(400).send({
        error: "Job is already assigned"
      });
    }

    const existingApplication = await jobApplication_model.findOne({
      job_id: job_id,
      applicants: req.user.profile
    });

    if (existingApplication) {
      return res.status(400).send({
        error: "You have already applied for this job"
      });
    }

    next();
  } catch (error) {
    console.log("Error validating job application:", error);
    res.status(500).send({
      error: "Error validating job application"
    });
  }
};

// Validate job assignment
const validateJobAssignment = async (req, res, next) => {
  try {
    const { job_id, user_id } = req.params;
    const job = await job_model.findOne({ _id: job_id });
    const freelancer_profile = await freelancerProfile_model.findOne({ _id: user_id });

    if (!job) {
      return res.status(404).send({
        error: "Job not found"
      });
    }

    if (!freelancer_profile) {
      return res.status(404).send({
        error: "Freelancer profile not found"
      });
    }

    if (job.assigned) {
      return res.status(400).send({
        error: "Job is already assigned"
      });
    }

    const jobApplication = await jobApplication_model.findOne({
      job_id: job_id,
      applicants: user_id
    });

    if (!jobApplication) {
      return res.status(400).send({
        error: "Freelancer has not applied for this job"
      });
    }

    next();
  } catch (error) {
    console.log("Error validating job assignment:", error);
    res.status(500).send({
      error: "Error validating job assignment"
    });
  }
};

// Validate progress update
const validateProgressUpdate = (req, res, next) => {
  const { progress } = req.body;

  if (progress === undefined || progress === null) {
    return res.status(400).send({
      error: "Progress is required"
    });
  }

  if (progress < 0 || progress > 100) {
    return res.status(400).send({
      error: "Progress must be between 0 and 100"
    });
  }

  next();
};

const job_middleware = {
  validateJobPost,
  validateJobApplication,
  validateJobAssignment,
  validateProgressUpdate
};

export default job_middleware;
