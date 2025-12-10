const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const {
  postJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
} = require("../controllers/jobController");

router.post("/create", isAuthenticated, postJob);

router.get("/get", isAuthenticated, getAllJobs);

router.get("/get/:id", isAuthenticated, getJobById);

router.get("/getAdminJobs", isAuthenticated, getAdminJobs);

module.exports = router;
