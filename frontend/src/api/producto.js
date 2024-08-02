import axios from 'axios';

const API_URL = 'http://localhost:3001/productos';

// Obtener todos los productos
export const getProducts = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
};

// Eliminar un producto por ID
export const deleteProduct = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}:`, error);
    throw error;
  }
};

// Actualizar un producto
export const updateProduct = async (id, productData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, productData, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error(`Error al actualizar el producto con ID ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo producto
export const createProduct = async (productData, token) => {
  try {
    const response = await axios.post(API_URL, productData, {
      headers: { Authorization: token } // Sin prefijo 'Bearer'
    });
    return response;
  } catch (error) {
    console.error('Error al crear el producto:', error);
    throw error;
  }
};
