const pdf_parse = require("pdf-parse");
const { generateResumePdf, generateResumeMetadata } = require("../services/ai_service")

const Resume = require("../model/Resume_pdf.model");
async function generate_ResumeController(req, res) {
    if (!req.file) {
        return res.status(400).json({
            message: "Resume PDF is required."
        });
    }
    const resume_content = await (new pdf_parse.PDFParse(Uint8Array.from(req.file.buffer)).getText());
    const { selfDescription, jobDescription } = req.body;

    const generatedResume = await generateResumePdf({
        resume: resume_content.text,
        selfDescription,
        jobDescription
    });
    const metadata = await generateResumeMetadata({
        resume: resume_content.text,
        jobDescription
    });
    const generatedResumeBuffer = Buffer.from(generatedResume);

    const resume = await Resume.create({
        user: req.User.id,
        title: metadata.title,
        atsScore: metadata.atsScore,
        resume: resume_content.text,
        selfDescription,
        jobDescription,
        generatedResume: generatedResumeBuffer
    });
    res.json({
        message: "Resume Generated Successfully.",
        resume
    });
}

async function getResumeIDController(req, res) {

    const { resumeID } = req.params;
    const resume = await Resume.findOne({
        _id: resumeID,
        user: req.User.id
    });
    if (!resume) {
        return res.status(404).json({
            message: "Resume not found."
        });
    }
    res.json({
        message: "Resume fetched successfully.",
        resume
    });
}

async function getAllResumeController(req, res) {
    const all_Resumes = await Resume.find({
        user: req.User.id
    })
        .sort({ createdAt: -1 })
        .select("-resume -selfDescription -jobDescription -__v -updatedAt");
    res.json({
        message: "Resumes fetched successfully.",
        all_Resumes
    });
}

async function getResumePdfController(req, res) {
    const { resumeID } = req.params;

    const resume = await Resume.findOne({
        _id: resumeID,
        user: req.User.id
    });
    if (!resume) {
        return res.status(404).json({
            message: "Resume not found."
        });
    }

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="resume_${resumeID}.pdf"`
    });

    res.send(resume.generatedResume);
}
module.exports = { generate_ResumeController, getResumeIDController, getAllResumeController, getResumePdfController };