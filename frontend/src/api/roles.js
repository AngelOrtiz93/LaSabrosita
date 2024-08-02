import axios from 'axios';

const API_URL = 'http://localhost:3001/roles';

// Obtener todos los roles
export const getRoles = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error('Error al obtener los roles:', error);
    throw error;
  }
};

// Eliminar un rol por ID
export const deleteRole = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error(`Error al eliminar el rol con ID ${id}:`, error);
    throw error;
  }
};

// Actualizar un rol
export const updateRole = async (id, roleData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, roleData, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error(`Error al actualizar el rol con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo rol
export const createRole = async (roleData, token) => {
  try {
    const response = await axios.post(API_URL, roleData, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error('Error al crear el rol:', error);
    throw error;
  }
};
