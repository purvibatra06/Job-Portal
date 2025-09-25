const JobPost = require('../../dblayer/models/jobpostingmodel.js');

// Create Job Post
const createJobPost = async (req, res) => {
    try {
        const { companyId,title,description,responsibilities,qualifications,skills,salaryRange,jobType,openings,genderPreference,
            tags,expiryDate,status} = req.body;

        const newJob = new JobPost({companyId,title,description,responsibilities,qualifications,skills,salaryRange,jobType,openings,genderPreference,tags,expiryDate,status});
        const savedJob = await newJob.save();
        res.status(201).json({ message: 'Job posted successfully', job: savedJob });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating job post', error: error.message });
    }
};

const getAllJobs = async (req, res) => {
    try {
        const jobs = await JobPost.find();

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "No jobs found." });
        }

        res.status(200).json({ jobs });
    } catch (error) {
        console.error("Error fetching all jobs:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const getPublishedJobs = async (req, res) => {
    try {
        const jobs = await JobPost.find({ status: "Published" });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "No published jobs found." });
        }

        res.status(200).json({ jobs });
    } catch (error) {
        console.error("Error fetching published jobs:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const deleteJobPost = async (req, res) => {
    try {
        const { jobId } = req.params;

        const deletedJob = await JobPost.findByIdAndDelete(jobId);

        if (!deletedJob) {
            return res.status(404).json({ message: "Job post not found." });
        }

        res.status(200).json({
            message: "Job post deleted successfully.",
            job: deletedJob
        });
    } catch (error) {
        console.error("Error deleting job post:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const updateJobPost = async (req, res) => {
    try {
        const { jobId } = req.params;
        const updatedData = req.body;

        const updatedJob = await JobPost.findByIdAndUpdate(
            jobId,
            { $set: updatedData },
            { new: true, runValidators: true }
        );
        if (!updatedJob) {
            return res.status(404).json({ message: "Job post not found." });
        }

        res.status(200).json({
            message: "Job post updated successfully.",
            job: updatedJob
        });
    } catch (error) {
        console.error("Error updating job post:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
module.exports = {
    createJobPost,
    getAllJobs,
    getPublishedJobs,
    deleteJobPost,
    updateJobPost     
};