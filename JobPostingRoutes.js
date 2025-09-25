const express = require('express');
const router = express.Router();
const { createJobPost,getAllJobs,getPublishedJobs,deleteJobPost,updateJobPost} = require('../weblayer/controllers/JobPostingController.js');
//create job
router.post('/createJob', createJobPost);

//get all jobs
router.get('/all', getAllJobs);
//get published jobs
router.get('/published', getPublishedJobs);
//delete jobpost by id
router.delete('/delete/:jobId', deleteJobPost);
//update jobpost by id
router.put('/update/:jobId', updateJobPost); 

module.exports = router;