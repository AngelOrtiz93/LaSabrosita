import axios from 'axios';

const API_URL = 'http://localhost:3001/pedidos'; // Ajusta la URL según tu configuración

// Obtener pedidos asignados a un domiciliario
export const getPedidosAsignadosDomiciliario = async (domiciliarioId, token) => {
  const response = await axios.get(`${API_URL}/asignados/domiciliario/${domiciliarioId}`, {
    headers: { Authorization: token } // Sin 'Bearer'
  });
  return response;
};

// Contar pedidos completados por un domiciliario
export const countPedidosCompletadosDomiciliario = async (domiciliarioId, token) => {
  const response = await axios.get(`${API_URL}/completados/domiciliario/${domiciliarioId}`, {
    headers: { Authorization: token } 
  });
  return response;
};

// Obtener pedidos asignados a un empleado
export const getPedidosAsignadosEmpleado = async (empleadoId, token) => {
  const response = await axios.get(`${API_URL}/asignados/empleado/${empleadoId}`, {
    headers: { Authorization: token } // Sin 'Bearer'
  });
  return response;
};

// Contar pedidos completados por un empleado
export const countPedidosCompletadosEmpleado = async (empleadoId, token) => {
  const response = await axios.get(`${API_URL}/completados/empleado/${empleadoId}`, {
    headers: { Authorization: token } // Sin 'Bearer'
  });
  return response;
};

// Obtener todos los pedidos
export const getPedidos = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: token } // Sin prefijo 'Bearer'
  });
  return response;
};

// Eliminar un pedido por ID
export const deletePedido = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: token } // Sin prefijo 'Bearer'
  });
  return response;
};

// Actualizar un pedido
export const updatePedido = async (id, pedidoData, token) => {
  const response = await axios.put(`${API_URL}/${id}`, pedidoData, {
    headers: { Authorization: token } // Sin prefijo 'Bearer'
  });
  return response;
};

// Crear un nuevo pedido
export const createPedido = async (pedidoData, token) => {
  const response = await axios.post(API_URL, pedidoData, {
    headers: { Authorization: token } // Sin prefijo 'Bearer'
  });
  return response;
};
