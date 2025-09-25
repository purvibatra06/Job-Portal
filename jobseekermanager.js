const Profile=require('../../dblayer/models/jobseekermodel.js')       
// Create
const createProfile = async (profileData) => {
    const profile = new Profile(profileData);
    return await profile.save();
};

// Delete
const deleteProfileById = async (id) => {
    return await Profile.findByIdAndDelete(id);
};

// Get by ID
const getProfileById = async (id) => {
    return await Profile.findById(id);
};

// Get all
const getAllProfiles = async () => {
    return await Profile.find();
};

// Update
const updateProfileById = async (id, updateData) => {
    return await Profile.findByIdAndUpdate(id, updateData, { new: true });
};

module.exports = {
    createProfile,
    deleteProfileById,
    getProfileById,
    getAllProfiles,
    updateProfileById
};