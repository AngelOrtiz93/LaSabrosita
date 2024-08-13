const Role = require('../models/Role');  // Importa el modelo Role
const Permission = require('../models/permission');  // Importa el modelo Permission

// Middleware de autorización
const authorize = (requiredPermission) => async (req, res, next) => {
  try {
    const user = req.user;
    const rolesWithPermissions = await Role.findAll({
      where: { id: user.roles.map(role => role.id) },
      include: { model: Permission, through: { attributes: [] } }
    });

    const hasPermission = rolesWithPermissions
      .flatMap(role => role.Permissions.map(permission => permission.name))
      .includes(requiredPermission);

    if (!hasPermission) {
      return res.status(403).json({ message: 'Permiso denegado' });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Error en la autorización', error: error.message });
  }
};

module.exports = authorize;

