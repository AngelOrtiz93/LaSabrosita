import axios from 'axios';

const API_URL = 'http://localhost:3001/usuarios';

export const getUsuarios = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: token }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los usuarios:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getUsuarioById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: token }
    });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el usuario con ID ${id}:`, error);
    throw error;
  }
};

export const deleteUsuario = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: token }
    });
    return response;
  } catch (error) {
    console.error(`Error al eliminar el usuario con ID ${id}:`, error);
    throw error;
  }
};

export const updateUsuario = async (id, usuarioData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, usuarioData, {
      headers: { Authorization: token },
      'Content-Type': 'multipart/form-data',
    });
    return response;
  } catch (error) {
    console.error(`Error al actualizar el usuario con ID ${id}:`, error);
    throw error;
  }
};

export const createUsuario = async (usuarioData, token) => {
  try {
    const response = await axios.post(API_URL, usuarioData, {
      headers: { Authorization: token },
      'Content-Type': 'multipart/form-data',
    });
    return response;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
};
