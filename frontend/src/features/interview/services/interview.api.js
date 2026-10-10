import axios from "axios";
import { API_URL } from "../../../../config/api";


const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export const generateIReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    const formData = new FormData();

    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);

    const response = await api.post("/api/interview/", formData);

    return response.data;
};

export const generateIReportID = async (interviewID) => {
    const response = await api.get(`/api/interview/report/${interviewID}`);

    return response.data;
};

export const generateAll_IReport = async () => {
    const response = await api.get("/api/interview/");

    return response.data;
};

export const generateResumePdf = async (interviewReportID) => {
    const response = await api.post(`/api/interview/resume/pdf/${interviewReportID}`, null, {
        responseType: "blob"
    });
    return response.data;
};

