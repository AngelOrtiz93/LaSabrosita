import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const login = async (form) => {
  try {
    // Realiza la solicitud de inicio de sesión
    const response = await axios.post(`${API_URL}/auth/login`, form);

    // Extrae y almacena los datos del usuario
    storeUserData(response.data);

    // Retorna los datos para que puedan ser usados por el componente
    return response.data;
  } catch (error) {
    // Manejo de errores
    throw handleError(error, 'Error en la solicitud de inicio de sesión');
  }
};

const storeUserData = ({ token, userId, roleIds, roleNames }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
  localStorage.setItem('roleIds', JSON.stringify(roleIds));
  localStorage.setItem('roleNames', JSON.stringify(roleNames));
};

const handleError = (error, defaultMessage) => {
  const errorMessage = error.response?.data?.message || error.message || defaultMessage;
  console.error('Error:', errorMessage);
  throw new Error(errorMessage);
};

// Otros métodos como register, forgotPassword y resetPassword se pueden mantener igual
export const register = async (form) => {
  try {
    await axios.post(`${API_URL}/clientes`, form);
  } catch (error) {
    throw handleError(error, 'Error en la solicitud de registro');
  }
};

export const forgotPassword = async (form) => {
  try {
    await axios.post(`${API_URL}/auth/forgot-password`, form);
  } catch (error) {
    throw handleError(error, 'Error en la solicitud de restablecimiento de contraseña');
  }
};

export const resetPassword = async (form) => {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password`, form);
    return response.data;
  } catch (error) {
    throw handleError(error, 'Error en la solicitud de restablecimiento de contraseña');
  }
};
