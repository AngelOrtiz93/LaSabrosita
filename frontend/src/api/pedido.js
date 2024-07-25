import axios from 'axios';

// URL base de la API
const API_URL = 'http://localhost:3001/pedidos'; // Ajusta la URL según tu configuración

// Obtener pedidos asignados a un domiciliario
export const getPedidosAsignadosDomiciliario = async (domiciliarioId, token) => {
  try {
    const response = await axios.get(`${API_URL}/asignados/domiciliario/${domiciliarioId}`, {
      headers: { Authorization: token } // Sin 'Bearer'
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Contar pedidos completados por un domiciliario
export const countPedidosCompletadosDomiciliario = async (domiciliarioId, token) => {
  try {
    const response = await axios.get(`${API_URL}/completados/domiciliario/${domiciliarioId}`, {
      headers: { Authorization: token } // Sin 'Bearer'
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Obtener pedidos asignados a un empleado
export const getPedidosAsignadosEmpleado = async (empleadoId, token) => {
  try {
    const response = await axios.get(`${API_URL}/asignados/empleado/${empleadoId}`, {
      headers: { Authorization: token } // Sin 'Bearer'
    });
    return response;
  } catch (error) {
    throw error;
  }
};

// Contar pedidos completados por un empleado
export const countPedidosCompletadosEmpleado = async (empleadoId, token) => {
  try {
    const response = await axios.get(`${API_URL}/completados/empleado/${empleadoId}`, {
      headers: { Authorization: token } // Sin 'Bearer'
    });
    return response;
  } catch (error) {
    throw error;
  }
};
