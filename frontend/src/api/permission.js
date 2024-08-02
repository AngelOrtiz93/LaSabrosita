import axios from 'axios';

const API_URL = 'http://localhost:3001/permissions';

// Obtener todos los permisos
export const getPermisos = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error('Error al obtener los permisos:', error);
    throw error;
  }
};

// Eliminar un permiso por ID
export const deletePermiso = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error(`Error al eliminar el permiso con ID ${id}:`, error);
    throw error;
  }
};

// Actualizar un permiso
export const updatePermiso = async (id, permisoData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, permisoData, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error(`Error al actualizar el permiso con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo permiso
export const createPermiso = async (permisoData, token) => {
  try {
    const response = await axios.post(API_URL, permisoData, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error('Error al crear el permiso:', error);
    throw error;
  }
};
