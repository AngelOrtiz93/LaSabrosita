import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const login = async (form) => {
  try {
    // Realiza la solicitud de inicio de sesión
    const response = await axios.post(`${API_URL}/auth/login`, form);

    // Extrae token y roles de la respuesta
    const { token, userId, roleIds, roleNames } = response.data;

    // Almacena el token y roles en el almacenamiento local
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('roleIds', JSON.stringify(roleIds));
    localStorage.setItem('roleNames', JSON.stringify(roleNames));

    // Retorna los datos para que puedan ser usados por el componente
    return { token, userId, roleIds, roleNames };
  } catch (error) {
    // Manejo de errores
    const errorMessage = error.response?.data?.message || error.message || 'Error en la solicitud de inicio de sesión';
    console.error('Error en login:', errorMessage);
    throw new Error(errorMessage);
  }
};

export const register = async (form) => {
  try {
    // Realiza la solicitud de registro de usuario
    await axios.post(`${API_URL}/clientes`, form);
  } catch (error) {
    // Manejo de errores
    console.error('Error en register:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const forgotPassword = async (form) => {
  try {
    // Realiza la solicitud para enviar el correo de restablecimiento de contraseña
    await axios.post(`${API_URL}/auth/forgot-password`, form);
  } catch (error) {
    // Manejo de errores
    console.error('Error en forgotPassword:', error.response?.data?.message || error.message);
    throw error;
  }
};

export const resetPassword = async (form) => {
  try {
    // Realiza la solicitud para restablecer la contraseña
    const response = await axios.post(`${API_URL}/auth/reset-password`, form);
    return response.data;
  } catch (error) {
    // Manejo de errores
    console.error('Error en resetPassword:', error.response?.data?.message || error.message);
    throw error;
  }
};
