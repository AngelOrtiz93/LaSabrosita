import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const login = async (form) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, form);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (form) => {
  try {
    await axios.post(`${API_URL}/clientes`, form);
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (form) => {
  try {
    await axios.post(`${API_URL}/auth/forgot-password`, form);
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (form) => {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password`, form);
    return response.data;
  } catch (error) {
    throw error; 
  }
};