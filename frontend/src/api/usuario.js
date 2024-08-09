import axios from 'axios';

const API_URL = 'http://localhost:3001/usuarios';

// Obtener todos los usuarios
export const getUsuarios = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    console.log('Datos obtenidos:', response.data); // Verifica la estructura aquí
    return response.data; // Devuelve los datos directamente
  } catch (error) {
    console.error('Error al obtener los usuarios:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Eliminar un usuario por ID
export const deleteUsuario = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    console.log(response.data); // Verifica el formato de los datos aquí
    return response;
  } catch (error) {
    console.error(`Error al eliminar el usuario con ID ${id}:`, error);
    throw error;
  }
};

// Actualizar un usuario
export const updateUsuario = async (id, usuarioData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, usuarioData, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error(`Error al actualizar el usuario con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo usuario
export const createUsuario = async (usuarioData, token) => {
  try {
    const response = await axios.post(API_URL, usuarioData, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    throw error;
  }
};
