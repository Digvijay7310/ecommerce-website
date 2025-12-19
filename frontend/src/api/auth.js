import axios from 'axios'

const API_URL = "http://localhost:5000/api/admin/auth"

export const loginAdmin = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, {email, password}, {withCredentials: true})
    return response.data.data
}

export const logoutAdmin = async() => {
    const response = await axios.post(`${API_URL}/logout`, {}, {withCredentials: true})
    return response.data.data
}

export const getAdminProfile = async() => {
    const response = await axios.get(`${API_URL}/me`, {withCredentials: true})
    return response.data.data
}