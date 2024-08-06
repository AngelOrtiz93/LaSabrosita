const Role = require('../models/Role');  // Importa el modelo Role
const Permission = require('../models/permission');  // Importa el modelo Permission

const authorize = (requiredPermission) => async (req, res, next) => {
  try {
    // Obtén el usuario del objeto req, que fue agregado por el middleware de autenticación
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    // Encuentra el rol del usuario, asegurándote de que sea una instancia Sequelize con sus permisos cargados
    const role = await Role.findByPk(user.roleId, {
      include: {
        model: Permission,
        through: { attributes: [] }  // Solo trae permisos sin la tabla intermedia
      }
    });

    if (!role) {
      return res.status(403).json({ message: 'Rol no encontrado' });
    }

    // Verifica si el rol tiene el permiso requerido
    const hasPermission = role.Permissions.some(permission => permission.name === requiredPermission);

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
