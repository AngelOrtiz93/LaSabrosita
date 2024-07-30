const Cliente = require('../models/cliente');
const Role = require('../models/Role');
const bcrypt = require('bcrypt');

// Obtener todos los clientes
exports.getAllClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, direccion, contraseña, roleId } = req.body;

    // Verificar si el roleId es válido
    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(400).json({ error: 'Rol no válido' });
    }

    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const cliente = await Cliente.create({
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      contraseña: hashedPassword,
      roleId
    });
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear cliente', error: error.message });
  }
};

// Obtener un cliente por ID
exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
};

// Actualizar un cliente
exports.updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, direccion, contraseña, roleId } = req.body;

    // Verificar si el roleId es válido
    if (roleId) {
      const role = await Role.findByPk(roleId);
      if (!role) {
        return res.status(400).json({ error: 'Rol no válido' });
      }
    }

    const cliente = await Cliente.findByPk(id);
    if (cliente) {
      cliente.nombre = nombre;
      cliente.apellido = apellido;
      cliente.email = email;
      cliente.telefono = telefono;
      cliente.direccion = direccion;
      if (contraseña) {
        cliente.contraseña = await bcrypt.hash(contraseña, 10);
      }
      if (roleId) {
        cliente.roleId = roleId;
      }
      await cliente.save();
      res.json(cliente);
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar cliente', error: error.message });
  }
};

// Eliminar un cliente
exports.deleteCliente = async (req, res) => {
  try {
    const deleted = await Cliente.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Cliente eliminado exitosamente' });
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
};
