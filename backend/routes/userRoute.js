const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");

const { isAuthenticated } = require("../middlewares/auth");
const {
  register,
  login,
  updateProfile,
  logout,
} = require("../controllers/userController");

router.post("/register", upload.single("file"), register);
router.post("/login", login);
router.get("/logout", logout);
router.post(
  "/update-profile",
  isAuthenticated,
  upload.single("resume"),
  updateProfile
);
module.exports = router;
