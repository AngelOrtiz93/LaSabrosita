import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Obtener todos los clientes
export const getClientes = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/clientes`, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    throw error;
  }
};

// Eliminar un cliente por ID
export const deleteCliente = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/clientes/${id}`, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error(`Error al eliminar el cliente con ID ${id}:`, error);
    throw error;
  }
};

// Actualizar un cliente
export const updateCliente = async (id, clienteData, token) => {
  try {
    const response = await axios.put(`${API_URL}/clientes/${id}`, clienteData, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error(`Error al actualizar el cliente con ID ${id}:`, error);
    throw error;
  }
};
