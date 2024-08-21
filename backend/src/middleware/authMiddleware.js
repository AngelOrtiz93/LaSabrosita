const jwt = require('jsonwebtoken');
const Role = require('../models/Role');
const Usuario = require('../models/usuario');
const Permission = require('../models/permission');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const usuario = await Usuario.findByPk(decoded.id, {
      include: {
        model: Role,
        include: [{ model: Permission }]
      }
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const roles = usuario.Roles.map(role => ({ id: role.id, name: role.name }));
    const permissions = decoded.permissions || roles.flatMap(role => role.Permissions.map(permission => permission.name));

    req.user = {
      id: usuario.id,
      roles,
      permissions
    };

    next();
  } catch (err) {
    res.status(403).json({ message: 'Token inválido o expirado', error: err.message });
  }
};

module.exports = authenticate;
