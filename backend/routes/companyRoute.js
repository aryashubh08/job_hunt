const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const { isAuthenticated } = require("../middlewares/auth");
const {
  registerCompany,
  getCompany,
  getCompanyById,
  updateCompany,
} = require("../controllers/companyController");

router.post("/register", isAuthenticated, registerCompany);
router.get("/getCompany", isAuthenticated, getCompany);
router.get("/getCompany/:id", isAuthenticated, getCompanyById);
router.put(
  "/updateCompany/:id",
  isAuthenticated,
  upload.single("file"),
  updateCompany
);

module.exports = router;
