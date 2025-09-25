const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    personalInfo: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        dob: { type: Date, required: true },
        location: { type: String, required: true },
    },
    headline: { type: String },
    bio: { type: String },
    education: [
        {
            institution: { type: String },
            degree: { type: String },
            datesAttended: { type: String },
            major: { type: String },
            achievements: { type: String }
        }
    ],
    experience: [
        {
            title: { type: String },
            company: { type: String },
            startDate: { type: Date },
            endDate: { type: Date },
            description: { type: String }
        }
    ],
    skills: [{ type: String }],
    languages: [
        {
            language: { type: String },
            proficiency: { type: String }
        }
    ],
    certifications: [
        {
            name: { type: String },
            issuingOrganization: { type: String },
            issueDate: { type: Date },
            expirationDate: { type: Date }
        }
    ],
    portfolioLinks: [String],
    resume: { type: String },  // Resume file path
    jobPreferences: {
        desiredRoles: [String],
        preferredLocations: [String],
        expectedSalary: { type: Number },
        jobTypes: [String], // Full-time, part-time, freelance, etc.
        remotePreference: { type: Boolean }
    }
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
