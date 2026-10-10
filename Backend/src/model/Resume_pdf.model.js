const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        default: "Developer"
    },
    atsScore: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    resume: {
        type: String,
        required: [true, "Resume is required."]
    },
    jobDescription: {
        type: String,
        required: [true, "Job description required."]
    },
    selfDescription: {
        type: String,
        required: [true, "Self description required."]
    },
    generatedResume: {
        type: Buffer,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Resume", resumeSchema);