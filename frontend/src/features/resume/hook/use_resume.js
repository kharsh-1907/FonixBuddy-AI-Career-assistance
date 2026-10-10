import { useState } from "react";
import { getAllResumes } from "../services/resume.api";

export const useResume = () => {
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(false);

    const getResumes = async () => {
        setLoading(true);
        try {
            const data = await getAllResumes();
            setResumes(data.all_Resumes);
            return data.all_Resumes;
        } catch (error) {
            // console.log("GET ALL RESUMES ERROR:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {resumes,loading, getResumes};
};