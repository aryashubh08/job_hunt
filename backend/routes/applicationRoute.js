const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const {
  applyJob,
  getAppliedJobs,
  getAllAppliedApplicants,
  updateStatus,
} = require("../controllers/applicationController");

router.get("/apply/:id", isAuthenticated, applyJob);
router.get("/get", isAuthenticated, getAppliedJobs);
router.get("/:id/applicants", isAuthenticated, getAllAppliedApplicants);
router.post("/status/:id/update", isAuthenticated, updateStatus);

module.exports = router;
