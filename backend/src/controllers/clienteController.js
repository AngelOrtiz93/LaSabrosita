const usuarioService = require('../services/clienteService');
const bcrypt = require('bcrypt');

exports.getAllClientes = async (req, res) => {
  try {
    const roleId = '172064d1-394e-4da9-8761-63dcdcc57c10'; // Puedes cambiar esto a un parámetro de consulta si es necesario
    const clientes = await usuarioService.getAllClientes(roleId); // Pasa el roleId al servicio
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

exports.getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await usuarioService.getClienteById(id);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
};

exports.createCliente = async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, direccion, contraseña } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const newCliente = await usuarioService.createUsuario({
      nombre,
      apellido,
      email,
      telefono,
      direccion,
      contraseña: hashedPassword,
      roleId: '172064d1-394e-4da9-8761-63dcdcc57c10', // Establece el roleId por defecto
    });
    res.status(201).json(newCliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};

exports.updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, direccion, contraseña, roleId } = req.body;
    const updates = { nombre, apellido, email, telefono, direccion, roleId };

    if (contraseña) {
      updates.contraseña = await bcrypt.hash(contraseña, 10);
    }

    const updatedCliente = await usuarioService.updateUsuario(id, updates);
    if (!updatedCliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(updatedCliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
};

exports.deleteCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await usuarioService.deleteUsuario(id);
    if (!result) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
};
