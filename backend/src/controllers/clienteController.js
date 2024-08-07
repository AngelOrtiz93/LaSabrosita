const clienteService = require('../services/clienteService');
const bcrypt = require('bcrypt');

exports.getAllClientes = async (req, res) => {
  try {
    const roleId = req.user.roles.map(role => role.id); // Obtén todos los roles del usuario autenticado
    const clientes = await clienteService.getAllClientes(roleId); // Pasa los roles al servicio
    res.json(clientes);
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

exports.getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await clienteService.getClienteById(id);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    console.error('Error al obtener cliente:', error);
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
};

exports.createCliente = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, direccion, contraseña } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const newCliente = await clienteService.createCliente({
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      contraseña: hashedPassword,
      roleId: req.user.roles.length > 0 ? req.user.roles[0].id : null, // Usa el roleId del usuario autenticado si es necesario
    });
    res.status(201).json(newCliente);
  } catch (error) {
    console.error('Error al crear cliente:', error);
    res.status(500).json({ error: 'Error al crear cliente' });
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
    res.json(updatedCliente);
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await clienteService.deleteCliente(id);
    if (!result) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
};
