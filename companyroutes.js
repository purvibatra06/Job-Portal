const express = require('express');
const router = express.Router();
const upload=require('../weblayer/Middlewares/authmiddleware.js');
const { createCompanyProfile,deleteCompanyProfile,getAllCompanyProfiles,updateCompanyProfile } = require('../weblayer/controllers/profilecontroller.js');

router.post('/companyProfile', upload.single('logo'), createCompanyProfile);

// Route to create a new company profile
router.post('/companyProfile', createCompanyProfile);
//route to delete a company profile
router.delete('/company-profile/:id', deleteCompanyProfile); 
//route to get all company profiles
router.get('/company-profiles', getAllCompanyProfiles);
//route to update company profile
router.put('/update-Profile/:id', updateCompanyProfile);

module.exports = router;