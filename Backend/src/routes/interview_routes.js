const expresss = require("express");
const Fetchuser = require("../Middleware/fetchUser")
const interview_controller = require("../controller/interviewController")
const upload = require("../Middleware/files.middleware")


// express-router
const interviewrouter = expresss.Router();  
// posting(API route)
interviewrouter.post("/",Fetchuser.authUser,upload.single("resume"),interview_controller.generate_IReportController)

// Getting(API route) : for frontend routing of report.
interviewrouter.get("/report/:interviewID",Fetchuser.authUser,interview_controller.getIReportIDController)

// Getting(API route) : for frontend routing for all report.
interviewrouter.get("/",Fetchuser.authUser,interview_controller.getAllIReportController)

// for generating Resume PDF from html(response of Report)
interviewrouter.post("/resume/pdf/:interviewReportID",Fetchuser.authUser,interview_controller.getResumePdfController)

module.exports = interviewrouter;
