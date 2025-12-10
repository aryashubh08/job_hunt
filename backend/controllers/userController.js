const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const imageKit = require("../config/imageKit.js");

/* ===================================================================================
   REGISTER USER
=================================================================================== */
exports.register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password, role } = req.body;

    const profileImage = req.file;
    // Use buffer directly (memory storage)
    const fileBuffer = profileImage.buffer;

    // Upload to ImageKit
    const response = await imageKit.upload({
      file: fileBuffer,
      fileName: profileImage.originalname,
      folder: "/jobHunt",
    });
    // Optimized URL
    const optimizedImageUrl = imageKit.url({
      src: response.url,
      transformation: [
        {
          width: "1280",
          quality: "auto",
          format: "webp",
        },
      ],
    });

    //  Check required fields
    if (!fullName || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //  Check if user already exists using same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    //  Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Create new user in database
    const newUser = await User.create({
      fullName,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profileImage: optimizedImageUrl, // Save the image URL inside the profile subdocument
      },
    });

    return res.status(200).json({
      success: true,
      message: "Account created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===================================================================================
   LOGIN USER
=================================================================================== */
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    console.log(email, password, role);

    //  Check all fields
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //  Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    //  Match password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    //  Check if role matches requested login role
    if (role !== user.role) {
      return res.status(400).json({
        success: false,
        message: "Account doesn't exist with this role",
      });
    }

    //  Create JWT token
    const tokenPayload = { userId: user._id, role: user.role };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // 🧹 Prepare user data excluding password
    const loggedInUser = {
      userId: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    // 🍪 Set token inside HTTP-only cookie
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({
        success: true,
        message: `Welcome back ${user.fullName}`,
        user: loggedInUser,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===================================================================================
   LOGOUT USER
=================================================================================== */
exports.logout = async (req, res) => {
  try {
    // 🍪 Clear cookie by setting empty token
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ===================================================================================
   UPDATE USER PROFILE
=================================================================================== */
// exports.updateProfile = async (req, res) => {
//   try {
//     const { fullName, email, phoneNumber, bio, skills } = req.body;
//     const userId = req.id; // 📌 Comes from Auth middleware

//     if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     //  Build dynamic update object (only update provided fields)
//     const updateData = {};

//     if (fullName) updateData.fullName = fullName;
//     if (email) updateData.email = email;
//     if (phoneNumber) updateData.phoneNumber = phoneNumber;
//     if (bio) updateData["profile.bio"] = bio;

//     //  Convert comma-separated skills into an array
//     if (skills) {
//       updateData["profile.skills"] = skills
//         .split(",")
//         .map((s) => s.trim())
//         .filter(Boolean);
//     }

//     // 🔄 Update and return latest user
//     const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
//       new: true,
//     });

//     if (!updatedUser) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     // 🧹 Prepare safe data to send
//     const safeUser = {
//       userId: updatedUser._id,
//       fullName: updatedUser.fullName,
//       email: updatedUser.email,
//       role: updatedUser.role,
//       profile: updatedUser.profile,
//     };

//     return res.status(200).json({
//       success: true,
//       message: "Profile updated successfully",
//       user: safeUser,
//     });
//   } catch (error) {
//     console.error("Update profile error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

/* ===================================================================================
   UPDATE PROFILE – UPLOAD RESUME TO IMAGEKIT
=================================================================================== */
exports.updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Fetch existing user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    /* ======================================================
       1️⃣ UPDATE BASIC FIELDS
    ====================================================== */
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    if (bio) user.profile.bio = bio;

    if (skills) {
      user.profile.skills = skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    /* ======================================================
       2️⃣ RESUME PDF UPLOAD (ONLY IF PROVIDED)
    ====================================================== */
    if (req.file) {
      const resumeFile = req.file;

      const uploadedResume = await imageKit.upload({
        file: resumeFile.buffer, // PDF buffer
        fileName: resumeFile.originalname, // Original name
        folder: "/jobHunt/resumes",
      });

      user.profile.resume = uploadedResume.url;
      user.profile.resumeOriginalName = resumeFile.originalname;
    }

    /* ======================================================
       3️⃣ SAVE UPDATED USER
    ====================================================== */
    const savedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: savedUser,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
