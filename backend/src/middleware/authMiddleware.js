const jwt = require('jsonwebtoken');
const Role = require('../models/Role');
const Usuario = require('../models/usuario');  // Asegúrate de que la ruta sea correcta

module.exports = async (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  // El token debería estar directamente en el encabezado sin 'Bearer '
  const token = authHeader;  // Se asume que el token ya está limpio

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Obtener el ID del usuario desde el token
    const { id } = decoded;

    // Obtener el usuario desde la base de datos
    const usuario = await Usuario.findByPk(id, { include: Role });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Obtener el rol del usuario
    const role = usuario.Role;

    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    // Agregar el usuario y el rol al objeto request para su uso posterior
    req.user = {
      id: usuario.id,
      roleId: role.id,
      roleName: role.name
    };

    next();
  } catch (err) {
    console.error('Error al verificar el token:', err);
    return res.status(403).json({ message: 'Token inválido o expirado', error: err.message });
  }
};
