import axios from "axios";
const API_URL = "http://localhost:5000/api/admin/products";

export const getStats = async () => {
    const response = await axios.get(API_URL, { withCredentials: true });
    return response.data;
};

export const searchProducts = async (query) => {
    const response = await axios.get(`${API_URL}/search?search=${query}`, { withCredentials: true });
    return response.data;
};

// Add, Edit, Delete products similarly using axios.post/put/delete
