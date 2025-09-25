const mongoose = require('mongoose');

const companyProfileSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    logo: { type: String }, 
    about: {
        description: { type: String },
        vision: { type: String },
        values: { type: String }
    },
    website: { type: String },
    socialLinks: [String], 
    headOfficeLocation: { type: String },
    industry: { type: String },
    subIndustry: { type: String },
    employeeCount: { type: Number },
    yearFounded: { type: Number },
    awards: [
        {
            title: { type: String },
            year: { type: Number }
        }
    ],
    certifications: [
        {
            name: { type: String },
            issuedBy: { type: String },
            year: { type: Number }
        }
    ],
    activeJobPosts: [
        {
            jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPost' }
        }
    ],
    reviews: [
        {
            reviewerName: { type: String },
            rating: { type: Number, min: 1, max: 5 },
            comment: { type: String },
           
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('CompanyProfile', companyProfileSchema);
