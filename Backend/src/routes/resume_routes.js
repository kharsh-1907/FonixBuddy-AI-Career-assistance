const expresss = require("express");

const Fetchuser = require("../Middleware/fetchUser");
const resume_controller = require("../controller/resumeController");
const upload = require("../Middleware/files.middleware");

// express-router
const resumerouter = expresss.Router();

// POST: Generate Resume
resumerouter.post("/", Fetchuser.authUser, upload.single("resume"), resume_controller.generate_ResumeController);
// GET: Get single Resume by ResumeID
resumerouter.get("/report/:resumeID", Fetchuser.authUser, resume_controller.getResumeIDController);
// GET: Download generated PDF
resumerouter.get("/pdf/:resumeID",Fetchuser.authUser,resume_controller.getResumePdfController);
// GET: Get all Resumes
resumerouter.get("/", Fetchuser.authUser, resume_controller.getAllResumeController);

module.exports = resumerouter;