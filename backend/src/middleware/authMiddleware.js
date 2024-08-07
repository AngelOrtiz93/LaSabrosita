const jwt = require('jsonwebtoken');
const Role = require('../models/Role');
const Usuario = require('../models/usuario'); // Asegúrate de que la ruta sea correcta

module.exports = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader; // Tomar el token completo sin 'Bearer '

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decoded;

    const usuario = await Usuario.findByPk(id, {
      include: {
        model: Role,
        through: { attributes: [] }  // Si estás usando una tabla de unión
      }
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    req.user = {
      id: usuario.id,
      roles: usuario.Roles.map(role => ({ id: role.id, name: role.name }))
    };

    next();
  } catch (err) {
    console.error('Error al verificar el token:', err);
    return res.status(403).json({ message: 'Token inválido o expirado', error: err.message });
  }
};
