const express = require('express');
const router = express.Router();
const  upload  = require('../weblayer/Middlewares/authmiddleware.js');
const { createUser,deleteProfile,getProfileById,getAllProfiles,updateProfile} = require('../weblayer/controllers/jobseekercontroller.js');

const cpUpload = upload.single('resume');
router.post('/profile', cpUpload, createUser);
router.delete('/delete/:id', deleteProfile);
router.get('/get/:id', getProfileById);
router.get('/AllProfiles', getAllProfiles);
router.put('/updateProfile/:id', updateProfile);

module.exports = router;


































// Multer configuration for file uploads (resume)

// Route to upload resume
// // router.post('/uploads', upload.single('resumefile'), (req, res) => {
// //     res.json({ message: 'Resume uploaded successfully', filePath: req.file.path });
// });

// Route to create or update profile
// router.post('/',
//     uploadPhoto.single('profilePhoto'),
//   uploadResume.single('resume'),
//   async (req, res) => {
//     try {
//       const {
//         name,
//         phone,
//         dob,
//         headline,
//         bio,
//         education,
//         experience,
//         skills,
//         languages,
//         certifications,
//         portfolioLinks,
//         preferences,
//       } = req.body;

//       const newProfile = new JobSeeker({
//         name,
//         phone,
//         dob,
//         headline,
//         bio,
//         education: JSON.parse(education || '[]'),
//         experience: JSON.parse(experience || '[]'),
//         skills: JSON.parse(skills || '[]'),
//         languages: JSON.parse(languages || '[]'),
//         certifications: JSON.parse(certifications || '[]'),
//         portfolioLinks: JSON.parse(portfolioLinks || '{}'),
//         preferences: JSON.parse(preferences || '{}'),
//         profilePhotoUrl: req.file ? req.file.path : null,
//         resumeUrl: req.files?.resume ? req.files.resume[0]?.path : null,
//       });

//       await newProfile.save();
//       res.status(201).json({ message: 'Profile created with uploads', profile: newProfile });
//     } catch (error) {
//       console.error(error);
//       res.status(400).json({ message: 'Error, error uploading profile', error:message});
//       }
//     }
// );




