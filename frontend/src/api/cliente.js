import axios from 'axios';

const API_URL = 'http://localhost:3001/clientes';

// Obtener todos los clientes
export const getClientes = async (token) => {
  try {
    const response = await axios.get(API_URL, {
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
    const response = await axios.delete(`${API_URL}/${id}`, {
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
    const response = await axios.put(`${API_URL}/${id}`, clienteData, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error(`Error al actualizar el cliente con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo cliente
export const createCliente = async (clienteData, token) => {
  try {
    const response = await axios.post(API_URL, clienteData, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error('Error al crear el cliente:', error);
    throw error;
  }
};
