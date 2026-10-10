import axios from "axios";
import { API_URL } from "../../../../config/api";


const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export const getAllResumes = async () => {
    const response = await api.get("/api/resume/");
    return response.data;
};