import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/pedidos`; // Ajusta la URL según tu configuración

// Obtener pedidos asignados a un domiciliario
export const getPedidosAsignadosDomiciliario = async (domiciliarioId, token) => {
  const response = await axios.get(`${API_URL}/asignados/domiciliario/${domiciliarioId}`, {
    headers: { Authorization: token } // Sin 'Bearer'
  });
  return response.data; // Asegúrate de devolver solo los datos
};

// Contar pedidos completados por un domiciliario
export const countPedidosCompletadosDomiciliario = async (domiciliarioId, token) => {
  const response = await axios.get(`${API_URL}/completados/domiciliario/${domiciliarioId}`, {
    headers: { Authorization: token } // Sin 'Bearer'
  });
  return response.data; // Asegúrate de devolver solo los datos
};

// Obtener pedidos asignados a un empleado
export const getPedidosAsignadosEmpleado = async (empleadoId, token) => {
  const response = await axios.get(`${API_URL}/asignados/empleado/${empleadoId}`, {
    headers: { Authorization: token } // Sin 'Bearer'
  });
  return response.data; // Asegúrate de devolver solo los datos
};

// Contar pedidos completados por un empleado
export const countPedidosCompletadosEmpleado = async (empleadoId, token) => {
  const response = await axios.get(`${API_URL}/completados/empleado/${empleadoId}`, {
    headers: { Authorization: token } // Sin 'Bearer'
  });
  return response.data; // Asegúrate de devolver solo los datos
};

// Obtener todos los pedidos
export const getPedidos = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: token } // Sin 'Bearer'
  });
  return response.data; // Asegúrate de devolver solo los datos
};





// Crear un nuevo pedido
export const createPedido = async (pedidoData, token) => {
  const response = await axios.post(API_URL, pedidoData, {
    headers: { Authorization: token } // Sin prefijo 'Bearer'
  });
  return response.data; // Asegúrate de devolver solo los datos
};


export const fetchPedidos = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/pedidos`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
    throw error;
  }
};

export const updatePedido = async (token, id, data) => {
  try {
    await axios.put(`${API_URL}/pedidos/${id}`, data, {
      headers: { Authorization: token },
    });
  } catch (error) {
    console.error('Error al actualizar el pedido:', error);
    throw error;
  }
};

export const deletePedido = async (token, id) => {
  try {
    await axios.delete(`${API_URL}/pedidos/${id}`, {
      headers: { Authorization: token },
    });
  } catch (error) {
    console.error('Error al eliminar el pedido:', error);
    throw error;
  }
};

