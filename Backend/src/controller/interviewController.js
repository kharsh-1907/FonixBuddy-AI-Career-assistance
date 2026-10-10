const pdf_parse = require("pdf-parse");
const {generateInterviewRreport,generateResumePdf} = require("../services/ai_service")
const Interview_Report = require("../model/Interview.report.model")


async function generate_IReportController(req, res) {

    if (!req.file) {
        return res.status(400).json({
            message: "Resume PDF is required."
        });
    }
    const resume_content = await (new pdf_parse.PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const { selfDescription, jobDescription } = req.body;

    const interviewReport_AI = await generateInterviewRreport({
        resume: resume_content.text,
        selfDescription,
        jobDescription
    })
    // console.log(JSON.stringify(interviewReport_AI, null, 2));
    const interview_report = await Interview_Report.create({
        user: req.User.id,
        resume: resume_content.text,
        selfDescription,
        jobDescription,
        ...interviewReport_AI,
        title: interviewReport_AI.title || "Full Stack Developer Intern",
        behaviouralQuestion:
            interviewReport_AI.behaviouralQuestion ||
            interviewReport_AI.behaviouralQuestions ||
            []
    });

    res.json({
        message: "Interview Report is Generated SUccessfullly.",
        interview_report
    })
}


async function getIReportIDController(req, res) {
    const { interviewID } = req.params;

    const interviewReport = await Interview_Report.findOne({
        _id: interviewID,
        user: req.User.id
    });
    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview Report not found."
        });
    }
    res.json({
        message: "Interview Report fetched successfully.",
        interview_report: interviewReport
    });
}


async function getAllIReportController(req, res) {
    const all_InterviewReports = await Interview_Report.find({ user: req.User.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -_v -updatedAt -technicalQuestions -skill_Gap -behaviouralQuestion -preparationPlan")

    res.json({ message: " Interview Reports fetched sucessfully.", all_InterviewReports })
}


async function getResumePdfController(req,res) {
    const {interviewReportID} = req.params;

    const interviewReport = await Interview_Report.findById(interviewReportID)
    if(!interviewReport){
        return res.json({message:"Interview Report Not Foound."})
    }
    const {resume,jobDescription,selfDescription} = interviewReport;
    const PdfBuffer = await generateResumePdf({resume,jobDescription,selfDescription})
    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment;"filename=resume_${interviewReportID}.pdf"`
    })

    res.send(PdfBuffer)
}

module.exports = { generate_IReportController, getIReportIDController, getAllIReportController,getResumePdfController}   
