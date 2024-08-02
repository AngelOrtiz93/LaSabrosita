import axios from 'axios';

const API_URL = 'http://localhost:3001/empleados';

// Obtener todos los empleados
export const getEmpleados = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
    throw error;
  }
};

// Eliminar un empleado por ID
export const deleteEmpleado = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error(`Error al eliminar el empleado con ID ${id}:`, error);
    throw error;
  }
};

// Actualizar un empleado
export const updateEmpleado = async (id, empleadoData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, empleadoData, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error(`Error al actualizar el empleado con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo empleado
export const createEmpleado = async (empleadoData, token) => {
  try {
    const response = await axios.post(API_URL, empleadoData, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error('Error al crear el empleado:', error);
    throw error;
  }
};
