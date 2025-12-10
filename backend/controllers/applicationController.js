const Application = require("../models/application"); // correct model
const Job = require("../models/jobModel");
const User = require("../models/userModel");

// ===============================================APPLY FOR A JOB====================================================
exports.applyJob = async (req, res) => {
  try {
    // 1️⃣ Extract logged-in user ID and job ID from request

    const userId = req.id; // `req.id` is coming from your auth middleware (decoded JWT)
    const jobId = req.params.id; // Job ID sent from URL ( /apply/:id )

    // If the job ID is missing, return error
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: "Job ID is required",
      });
    }

    // 2️⃣ Get logged-in user details from DB

    const user = await User.findById(userId);

    // Check if user exists (should never fail if your auth is correct)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3️⃣ Restrict recruiters from applying to jobs

    if (user.role === "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Recruiters cannot apply for jobs.",
      });
    }

    // 4️⃣ Check if the job exists

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    // 5️⃣ Check if this user has already applied for this job

    const existingApplication = await Application.findOne({
      job: jobId, // Which job?
      applicant: userId, // Who applied?
    });

    // If found, block duplicate application
    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }

    // 6️⃣ Create a new job application

    const newApplication = await Application.create({
      job: jobId, // Reference to job
      applicant: userId, // Reference to applicant user
    });

    // 7️⃣ Push application ID into job's applications array

    job.applications.push(newApplication._id);

    // Save the updated job document
    await job.save();

    // 8️⃣ Send successful response

    return res.status(201).json({
      success: true,
      message: "Job applied successfully.",
      applicationId: newApplication._id,
    });
  } catch (error) {
    // 9️⃣ Backend error handling

    console.error("Apply job error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ============================GET ALL JOBS APPLIED BY A USER ====================================================
exports.getAppliedJobs = async (req, res) => {
  try {
    // 1️⃣ Get logged-in user ID

    const userId = req.id;

    // 2️⃣ Fetch all applications made by this user
    // - Filter by applicant
    // - Sort by creation date (latest first)
    // - Populate job and inside job populate company

    const applications = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 }) // Sort BEFORE populating
      .populate({
        path: "job", // Populate job details
        populate: {
          path: "company", // Inside job, populate company details
        },
      });

    // 3️⃣ If user has no applications
    // Mongoose returns [] (empty array), never null,
    // so check length instead of !applications

    if (applications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No applications found.",
      });
    }

    // 4️⃣ Send successful response

    return res.status(200).json({
      success: true,
      applications, // returning array of all applied jobs
    });
  } catch (error) {
    // 5️⃣ Server Error

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//=====================================================get applicants====================================================
exports.getAllAppliedApplicants = async (req, res) => {
  try {
    // Extract jobId from URL params -> /job/:jobId/applicants
    const jobId = req.params.id;

    // Fetch job by ID and populate all applications
    // Also populate each application's "applicant" user
    const job = await Job.findById(jobId).populate({
      path: "applications", // populate all application IDs
      options: { sort: { createdAt: -1 } }, // sort applications by newest
      populate: {
        path: "applicant",
        options: { sort: { createdAt: -1 } }, // inside each application → populate the applicant details
      },
    });

    // If no job exists
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // If job exists but has zero applications
    if (!job.applications || job.applications.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No applicants yet",
        applicants: [],
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      totalApplicants: job.applications.length, // number of applicants
      applicants: job.applications, // populated applications
    });
  } catch (error) {
    // Catch block for unexpected server errors
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

//=======================update status pending,accepted or rejected =============================

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body; // New status coming from frontend
    const applicationId = req.params.id; // Application ID from URL

    // 🔍 Validate input
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required.",
      });
    }

    // 🔍 Find the application using application ID
    const application = await Application.findById(applicationId);

    // ❌ If no application found
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // ✏️ Update the status (convert to lowercase for consistency)
    application.status = status.toLowerCase();

    // 💾 Save the updated document
    await application.save();

    return res.status(200).json({
      success: true,
      message: "Status updated successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
