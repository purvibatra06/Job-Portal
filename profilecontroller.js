const CompanyProfile = require('../../dblayer/models/companyprofile.js');
const createCompanyProfile = async (req, res) => {
    try {
        const {
            companyName,logo,about,website,socialLinks,headOfficeLocation,industry,subIndustry,employeeCount,yearFounded,awards,
            certifications,activeJobPosts,reviews } = req.body;
        const parsedProfile = {
            companyName,
            logo: req.file ? req.file.path : null,
            about: JSON.parse(about || '{}'), 
            website,
            socialLinks: JSON.parse(socialLinks || '[]'),
            headOfficeLocation,
            industry,
            subIndustry,
            employeeCount: parseInt(employeeCount),
            yearFounded: parseInt(yearFounded),
            awards: JSON.parse(awards || '[]'),
            certifications: JSON.parse(certifications || '[]'),
            activeJobPosts: JSON.parse(activeJobPosts || '[]'),
            reviews: JSON.parse(reviews || '[]')
        };

        const profile = new CompanyProfile(parsedProfile);
        await profile.save();

        res.status(201).json({ message: 'Company profile created successfully!', profile });
    } catch (error) {
        console.error("Error in createCompanyProfile:", error);
        res.status(500).json({ message: 'Failed to create company profile.', error: error.message });
    }
};

const deleteCompanyProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProfile = await CompanyProfile.findByIdAndDelete(id);

        if (!deletedProfile) {
            return res.status(404).json({ message: 'Company profile not found.' });
        }

        res.status(200).json({ message: 'Company profile deleted successfully.', data: deletedProfile });
    } catch (error) {
        console.error("Error in deleteCompanyProfile:", error);
        res.status(500).json({ message: 'Failed to delete company profile.', error: error.message });
    }
};

const getAllCompanyProfiles = async (req, res) => {
    try {
        const profiles = await CompanyProfile.find();

        if (profiles.length === 0) {
            return res.status(404).json({ message: 'No company profiles found.' });
        }

        res.status(200).json({ message: 'Company profiles retrieved successfully.', data: profiles });
    } catch (error) {
        console.error("Error in getAllCompanyProfiles:", error);
        res.status(500).json({ message: 'Failed to retrieve company profiles.', error: error.message });
    }
};

const updateCompanyProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const {companyName,logo,about,website,socialLinks,headOfficeLocation,industry,subIndustry,employeeCount,yearFounded,awards,certifications,activeJobPosts,reviews
    } = req.body;

    const updatedProfile = await CompanyProfile.findByIdAndUpdate(
      id,
      {
        companyName,logo,about,website,socialLinks,headOfficeLocation,industry,subIndustry,employeeCount,yearFounded,awards, certifications,activeJobPosts,reviews
      },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).send({
        success: false,
        message: 'Company profile not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Company profile updated successfully',
      profile: updatedProfile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while updating company profile',
    });
  }
};
module.exports = {
    createCompanyProfile,
       deleteCompanyProfile,
       getAllCompanyProfiles,
       updateCompanyProfile
};