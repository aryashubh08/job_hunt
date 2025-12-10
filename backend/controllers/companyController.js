const Company = require("../models/company");

//==================================== Register Company ====================================
exports.registerCompany = async (req, res) => {
  try {
    // ✔ Allow only recruiters to create a company
    if (req.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Only recruiters can register a company",
      });
    }

    const { companyName } = req.body;

    // ✔ Validate company name
    if (!companyName || companyName.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Company name is required",
      });
    }

    // ✔ Check if a company with same name already exists
    const existingCompany = await Company.findOne({
      name: companyName.trim(),
    });

    if (existingCompany) {
      return res.status(400).json({
        success: false,
        message: "Company with this name already exists",
      });
    }

    // ✔ Create new company and link it to recruiter (userId)
    const newCompany = await Company.create({
      name: companyName.trim(),
      userId: req.id, // recruiter ID who created the company
    });

    return res.status(201).json({
      success: true,
      message: "Company registered successfully!",
      company: newCompany,
    });
  } catch (error) {
    console.error("Error registering company:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//==================================== Get All Companies of the Logged-in Recruiter ===================
exports.getCompany = async (req, res) => {
  try {
    const userId = req.id; // recruiter ID

    // ✔ Find all companies created by this recruiter
    const companies = await Company.find({ userId });

    // ✔ Return empty list if none found (not an error)
    if (companies.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No companies found",
        companies: [],
      });
    }

    return res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//==================================== Get Company by ID ==================================
exports.getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    // ✔ Correct: findById expects just the ID, not an object
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    return res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    console.error("Error fetching company:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//==================================== Update Company ======================================
exports.updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const companyId = req.params.id;
    const file = req.file; // for optional image upload (logo)

    // ✔ Fetch company first to check ownership
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // ✔ Only allow recruiter who created this company to update it
    if (company.userId.toString() !== req.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this company",
      });
    }

    // ✔ Build update object dynamically (update only what user sends)
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (website) updateData.website = website;
    if (location) updateData.location = location;

    // ✔ If an image file is provided, upload it (ImageKit logic later)
    if (file) {
      // TODO: upload to ImageKit or Cloudinary
      // updateData.logo = uploadedImage.url
    }

    // ✔ Update company in DB
    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      updateData,
      { new: true } // return updated version
    );

    return res.status(200).json({
      success: true,
      message: "Company information updated successfully",
      company: updatedCompany,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
