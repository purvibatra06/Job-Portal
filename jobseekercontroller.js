const jobseekerservices=require('../../servicelayer/jobseekerservices.js')
const createUser = async (req, res) => {
    try {
        const profile = await jobseekerservices.createUserProfile(req.body, req.file);
        res.status(201).json({ message: 'Profile created successfully!', profile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create profile.', error: error.message });
    }
};

const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProfile = await jobseekerservices.deleteUserProfile(id);

        if (!deletedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({ message: 'Profile deleted successfully', deletedProfile });
    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).json({ message: 'Failed to delete profile', error: error.message });
    }
};

const getProfileById = async (req, res) => {
    try {
        const { id } = req.params;

        const profile = await jobseekerservices.getUserProfileById(id);

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({ profile });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
    }
};

const getAllProfiles = async (req, res) => {
    try {
        const profiles = await jobseekerservices.getAllUserProfiles();

        if (profiles.length === 0) {
            return res.status(404).json({ message: 'No profiles found' });
        }

        res.status(200).json({ profiles });
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ message: 'Failed to fetch profiles', error: error.message });
    }
};

const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const { personalInfo,headline,bio,education,experience,skills,languages,certifications,portfolioLinks,jobPreferences
    } = req.body;

    const profile = await jobseekerservices.updateUserProfile(
      id,
      {personalInfo,headline,bio,education,experience,skills,languages,certifications,portfolioLinks,jobPreferences
      },
      { new: true }
    );

    if (!profile) {
      return res.status(404).send({
        success: false,
        message: 'Profile not found',
      });
    }

    res.status(200).send({
      success: true,
      message: 'Profile updated successfully',
      profile,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: 'Error while updating profile',
    });
  }
};

module.exports = {
    createUser,
    deleteProfile,
    getProfileById,
    getAllProfiles,
    updateProfile
};






