import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const getProducts = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/productos`, {
      headers: {
        Authorization: token
      }
    });
    return response;
  } catch (error) {
    throw error;
  }
};
