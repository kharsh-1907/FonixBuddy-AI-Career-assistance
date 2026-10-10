import axios from 'axios';
import { API_URL } from "../../../../config/api";


const URL = API_URL;
export async function signup({ name, email, password }) {
    try {
        const response = await axios.post(`${URL}/api/auth/signup`, { name, email, password }, { withCredentials: true })
        return response.data
    } catch (error) {
        // console.log(error)
        throw error
    }
}

export async function login({ email, password }) {
    try {
        const response = await axios.post(`${URL}/api/auth/login`, { email, password }, { withCredentials: true })
        return response.data
    } catch (error) {
        // console.log(error)
        throw error
    }
}

export async function logout() {
    try {
        const response = await axios.get(`${URL}/api/auth/logout`, { withCredentials: true })
        return response.data
    } catch (error) {
        // console.log(error)
        throw error
    }
}

export async function getMe() {
    try {
        const response = await axios.get(`${URL}/api/auth/get-me`, { withCredentials: true })
        return response.data
    } catch (error) {
        // console.log(error)
        throw error
    }
}