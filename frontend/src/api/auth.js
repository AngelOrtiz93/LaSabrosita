import axios from 'axios';

const API_URL = 'http://localhost:3001/auth/login';

export const login = async (form) => {
  try {
    const response = await axios.post(API_URL, form);
    return response.data;
  } catch (error) {
    throw error;
  }
};
