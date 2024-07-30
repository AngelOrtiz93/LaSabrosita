const jwt = require('jsonwebtoken');
const Role = require('../models/Role');
const Cliente = require('../models/cliente');
const Empleado = require('../models/empleado');
const Domiciliario = require('../models/domiciliario');

module.exports = async (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  // El token debería estar directamente en el encabezado
  const token = authHeader.replace('Bearer ', ''); // Si usabas 'Bearer ', remueve el prefijo

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Obtener el tipo de usuario y el ID del usuario desde el token
    const { id, userType } = decoded;

    // Determinar el modelo según el tipo de usuario
    let UserModel;
    switch (userType) {
      case 'cliente':
        UserModel = Cliente;
        break;
      case 'empleado':
        UserModel = Empleado;
        break;
      case 'domiciliario':
        UserModel = Domiciliario;
        break;
      default:
        return res.status(400).json({ message: 'Tipo de usuario no válido' });
    }

    // Obtener el usuario desde la base de datos
    const user = await UserModel.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Obtener el rol del usuario
    const role = await Role.findByPk(user.roleId);

    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado' });
    }

    // Agregar el usuario y el rol al objeto request para su uso posterior
    req.user = {
      id: user.id,
      userType,
      roleId: user.roleId,
      roleName: role.name
    };

    next();
  } catch (err) {
    console.error('Error al verificar el token:', err);
    return res.status(403).json({ message: 'Token inválido o expirado', error: err.message });
  }
};
