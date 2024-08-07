const Role = require('../models/Role');  // Importa el modelo Role
const Permission = require('../models/permission');  // Importa el modelo Permission

const authorize = (requiredPermission) => async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const roles = user.roles;
    const roleIds = roles.map(role => role.id);

    const rolesWithPermissions = await Role.findAll({
      where: { id: roleIds },
      include: {
        model: Permission,
        through: { attributes: [] }
      }
    });

    const permissions = rolesWithPermissions.flatMap(role => role.Permissions.map(permission => permission.name));
    const hasPermission = permissions.includes(requiredPermission);

    if (!hasPermission) {
      return res.status(403).json({ message: 'Permiso denegado' });
    }

    next();
  } catch (error) {
    console.error('Error en middleware de autorización:', error);
    res.status(500).json({ message: 'Error en la autorización', error: error.message });
  }
};

module.exports = authorize;
