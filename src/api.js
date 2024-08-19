// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';  // Adjust if your Django server is on a different port

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}register/`, userData);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}login/`, userData);
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const response = await axios.post(`${API_URL}logout/`);
        return response.data;
    } catch (error) {
        console.error('Error logging out user:', error);
        throw error;
    }
};
