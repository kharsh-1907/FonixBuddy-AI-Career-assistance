import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { generateIReport, generateAll_IReport, generateIReportID, generateResumePdf } from "../services/interview.api";
import { InterviewContext } from "../interviewcontext";

export const useInterview = () => {
    const context = useContext(InterviewContext);
    const { interviewID } = useParams();

    if (!context) {
        throw new Error("UseInterview must be within InterviewProvider");
    }

    const { report, Setreport, reports, SetReports, loading, Setloading } = context;

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        Setloading(true);
        try {
            const data = await generateIReport({ jobDescription, selfDescription, resumeFile });
            Setreport(data.interview_report);
            SetReports(prev => [data.interview_report, ...prev]);
            return data.interview_report;
        } catch (error) {
            // console.log("GENERATE REPORT ERROR:", error);
            throw error;
        } finally {
            Setloading(false);
        }
    };

    const getReportID = async (interviewID) => {
        Setloading(true);
        try {
            // console.log("FETCHING REPORT ID:", interviewID);

            const data = await generateIReportID(interviewID);

            // console.log("REPORT RESPONSE:", data);

            Setreport(data.interview_report);

            // console.log("REPORT SET:", data.interview_report);

            return data.interview_report;
        } catch (error) {
            // console.log("GET REPORT ERROR:", error);
            throw error;
        } finally {
            Setloading(false);
        }
    };

    const getReports = async () => {
        Setloading(true);
        try {
            const data = await generateAll_IReport();
            // console.log("ALL REPORTS RESPONSE:", data);
            SetReports(data.all_InterviewReports);

            return data.all_InterviewReports;
        } catch (error) {
            // console.log("GET ALL REPORTS ERROR:", error);
            throw error;
        } finally {
            Setloading(false);
        }
    };

    const getResumePdf = async (interviewReportID) => {
        Setloading(true);
        try {
            // console.log("FETCHING RESUME PDF:", interviewReportID);
            const data = await generateResumePdf(interviewReportID);
            const url = window.URL.createObjectURL(data);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `resume_${interviewReportID}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            return data;
        } catch (error) {
            // console.log("GET RESUME PDF ERROR:", error);
            throw error;
        } finally {
            Setloading(false);
        }
    }

    useEffect(() => {
        // console.log("INTERVIEW EFFECT:", interviewID);

        if (interviewID) {
            getReportID(interviewID);
        } else {
            getReports();
        }
    }, [interviewID]);

    return {
        loading,
        report,
        reports,
        generateReport,
        getReportID,
        getReports,
        getResumePdf
    };
};