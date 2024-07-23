const Cliente = require('../models/cliente'); 
const bcrypt = require('bcrypt');

exports.getAllClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

exports.createCliente = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, direccion, contraseña } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const newCliente = await Cliente.create({
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      contraseña: hashedPassword,
    });
    res.status(201).json(newCliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};

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

exports.updateCliente = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, direccion, contraseña } = req.body;
    const updates = { nombre, apellido, email, telefono, direccion };

    if (contraseña) {
      updates.contraseña = await bcrypt.hash(contraseña, 10);
    }

    const [updated] = await Cliente.update(updates, {
      where: { id: req.params.id }
    });

    if (updated) {
      const updatedCliente = await Cliente.findByPk(req.params.id);
      res.json(updatedCliente);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
};

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
