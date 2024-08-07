const UserRole = require('../models/UserRole'); // Asegúrate de que la ruta y el nombre del modelo sean correctos

exports.assignRoleToUser = async (userId, roleId) => {
  try {
    await UserRole.create({
      userId,
      roleId,
    });
  } catch (error) {
    console.error('Error al asignar rol al usuario:', error);
    throw new Error('Error al asignar rol al usuario: ' + error.message);
  }
};

exports.updateUserRole = async (userId, newRoleId) => {
  try {
    const userRole = await UserRole.findOne({ where: { userId } });
    if (userRole) {
      userRole.roleId = newRoleId;
      await userRole.save();
    } else {
      await UserRole.create({ userId, roleId: newRoleId });
    }
  } catch (error) {
    console.error('Error al actualizar el rol del usuario:', error);
    throw new Error('Error al actualizar el rol del usuario: ' + error.message);
  }
};
