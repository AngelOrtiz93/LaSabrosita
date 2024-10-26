import axios from 'axios';

export const fetchProductos = async (token) => {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/productos`, {
    headers: { Authorization: token },
  });
  return response.data;
};

export const createProducto = async (token, producto) => {
  await axios.post(`${import.meta.env.VITE_API_URL}/productos`, producto, {
    headers: { Authorization: token },
  });
};

export const updateProducto = async (token, producto) => {
  await axios.put(`${import.meta.env.VITE_API_URL}/productos/${producto.id}`, producto, {
    headers: { Authorization: token },
  });
};

export const deleteProducto = async (token, id) => {
  await axios.delete(`${import.meta.env.VITE_API_URL}/productos/${id}`, {
    headers: { Authorization: token },
  });
};
