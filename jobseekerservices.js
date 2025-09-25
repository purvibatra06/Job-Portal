const JobSeekerManager=require('../dblayer/implementations/jobseekermanager.js');
//Create Profile
const createUserProfile = async (body, file) => {
    const {
        personalInfo,
        headline,
        bio,
        education,
        experience,
        skills,
        languages,
        certifications,
        portfolioLinks,
        jobPreferences
    } = body;

    const parsedProfile = {
        personalInfo: JSON.parse(personalInfo),
        headline,
        bio,
        education: JSON.parse(education || '[]'),
        experience: JSON.parse(experience || '[]'),
        skills: JSON.parse(skills || '[]'),
        languages: JSON.parse(languages || '[]'),
        certifications: JSON.parse(certifications || '[]'),
        portfolioLinks: JSON.parse(portfolioLinks || '[]'),
        jobPreferences: JSON.parse(jobPreferences || '{}'),
        resume: file ? file.path : null
    };

    return await JobSeekerManager.createProfile(parsedProfile);
};

// Delete Profile
const deleteUserProfile = async (id) => {
    return await JobSeekerManager.deleteProfileById(id);
};

// Get by ID
const getUserProfileById = async (id) => {
    return await JobSeekerManager.getProfileById(id);
};

// Get All
const getAllUserProfiles = async () => {
    return await JobSeekerManager.getAllProfiles();
};

// Update
const updateUserProfile = async (id, body) => {
    return await JobSeekerManager.updateProfileById(id, body);
};

module.exports = {
    createUserProfile,
    deleteUserProfile,
    getUserProfileById,
    getAllUserProfiles,
    updateUserProfile
};