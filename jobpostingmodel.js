const mongoose = require('mongoose');
const CompanyProfile=require('./companyprofile.js');

const jobPostingSchema = new mongoose.Schema({
  companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: CompanyProfile,
        required: true     
    },
  title: { type: String, required: true },
  description: { type: String },
  responsibilities: { type: String },
  qualifications: { type: String },
  skills: [String],
  salaryRange: {
    min: Number,
    max: Number
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Remote'],
    default: 'Full-time'
  },
  numberOfOpenings: { type: Number },
  genderPreference: { type: String },
  tags: [String],
  expiryDate: { type: Date },
  status: { type: String, enum: ['Draft', 'Published'], default: 'Draft' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('JobPosting', jobPostingSchema);
