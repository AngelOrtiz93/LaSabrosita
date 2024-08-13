const clienteService = require('../services/clienteService');
const bcrypt = require('bcrypt');

exports.getAllClientes = async (req, res) => {
  try {
    const roleId = req.user.roles.map(role => role.id);
    const clientes = await clienteService.getAllClientes(roleId);
    res.json({
      success: true,
      message: 'Clientes obtenidos exitosamente',
      data: clientes
    });
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({
      error: 'Error al obtener clientes',
      detalles: error.message
    });
  }
};

exports.getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await clienteService.getClienteById(id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json({
      success: true,
      message: 'Cliente obtenido exitosamente',
      data: cliente
    });
  } catch (error) {
    console.error('Error al obtener cliente:', error);
    res.status(500).json({
      error: 'Error al obtener cliente',
      detalles: error.message
    });
  }
};

exports.createCliente = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, direccion, contraseña } = req.body;
    
    // Validación de la contraseña
    if (!contraseña) {
      return res.status(400).json({ error: 'Contraseña inválida', detalles: 'La contraseña no puede estar vacía.' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const clienteRoleId = '05b1d9d5-d727-4c99-b404-16b8fcffd684';

    // Intentar crear un nuevo cliente
    const newCliente = await clienteService.createCliente({
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      contraseña: hashedPassword,
      roleId: clienteRoleId,
    });

    res.status(201).json({
      success: true,
      message: 'Cliente creado exitosamente',
      data: newCliente
    });
  } catch (error) {
    console.error('Error al crear cliente:', error);

    // Verifica si el error es de Sequelize
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        error: 'Error al crear cliente',
        detalles: `El cliente con el email '${req.body.email}' ya existe.`
      });
    } else if (error.name === 'SequelizeValidationError') {
      // Errores de validación de Sequelize
      return res.status(400).json({
        error: 'Error de validación',
        detalles: error.errors.map(e => e.message).join(', ')
      });
    }

    // Otros errores
    return res.status(500).json({
      error: 'Error al crear cliente',
      detalles: error.message
    });
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, direccion, contraseña, roleId } = req.body;
    const updates = { nombre, apellido, email, telefono, direccion };

    if (contraseña) {
      updates.contraseña = await bcrypt.hash(contraseña, 10);
    }

    const updatedCliente = await clienteService.updateCliente(id, { ...updates, roleId });
    if (!updatedCliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json({
      success: true,
      message: 'Cliente actualizado exitosamente',
      data: updatedCliente
    });
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    res.status(500).json({
      error: 'Error al actualizar cliente',
      detalles: error.message
    });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await clienteService.deleteCliente(id);
    if (!result) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.status(200).json({
      success: true,
      message: 'Cliente eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({
      error: 'Error al eliminar cliente',
      detalles: error.message
    });
  }
};
