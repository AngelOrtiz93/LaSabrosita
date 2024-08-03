import axios from 'axios';

const API_URL = 'http://localhost:3001/detalle-pedidos';

// Obtener todos los detalles de pedido
export const getDetallePedidos = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: token }, // Sin prefijo 'Bearer'
    });
    return response; // Asegúrate de devolver solo los datos
  } catch (error) {
    console.error('Error al obtener los detalles de pedido:', error);
    throw error;
  }
};

// Obtener un detalle de pedido por ID
export const getDetallePedidoById = async (id, token) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: token }, // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error(`Error al obtener el detalle de pedido con ID ${id}:`, error);
    throw error;
  }
};

// Eliminar un detalle de pedido por ID
export const deleteDetallePedido = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: token }, // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error(`Error al eliminar el detalle de pedido con ID ${id}:`, error);
    throw error;
  }
};

// Actualizar un detalle de pedido
export const updateDetallePedido = async (id, detallePedidoData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, detallePedidoData, {
      headers: { Authorization: token }, // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error(`Error al actualizar el detalle de pedido con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo detalle de pedido
export const createDetallePedido = async (detallePedidoData, token) => {
  try {
    const response = await axios.post(API_URL, detallePedidoData, {
      headers: { Authorization: token }, // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error('Error al crear el detalle de pedido:', error);
    throw error;
  }
};
