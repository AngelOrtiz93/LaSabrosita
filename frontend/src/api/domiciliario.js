import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Obtener todos los domiciliarios
export const getDomiciliarios = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/domiciliarios`, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error('Error al obtener los domiciliarios:', error);
    throw error;
  }
};

// Eliminar un domiciliario por ID
export const deleteDomiciliario = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/domiciliarios/${id}`, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error(`Error al eliminar el domiciliario con ID ${id}:`, error);
    throw error;
  }
};

// Actualizar un domiciliario
export const updateDomiciliario = async (id, domiciliarioData, token) => {
  try {
    const response = await axios.put(`${API_URL}/domiciliarios/${id}`, domiciliarioData, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error(`Error al actualizar el domiciliario con ID ${id}:`, error);
    throw error;
  }
};
