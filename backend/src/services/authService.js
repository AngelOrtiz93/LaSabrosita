const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Cliente = require('../models/cliente');
const Empleado = require('../models/empleado');
const Domiciliario = require('../models/domiciliario');

const authenticateCliente = async (email, password) => {
  const cliente = await Cliente.findOne({ where: { email } });
  if (!cliente) throw new Error('Cliente no encontrado');
  const isMatch = await bcrypt.compare(password, cliente.contraseña);
  if (!isMatch) throw new Error('Contraseña incorrecta');
  const token = jwt.sign({ id: cliente.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

const authenticateEmpleado = async (email, password) => {
  const empleado = await Empleado.findOne({ where: { email } });
  if (!empleado) throw new Error('Empleado no encontrado');
  const isMatch = await bcrypt.compare(password, empleado.contraseña);
  if (!isMatch) throw new Error('Contraseña incorrecta');
  const token = jwt.sign({ id: empleado.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

const authenticateDomiciliario = async (email, password) => {
  const domiciliario = await Domiciliario.findOne({ where: { email } });
  if (!domiciliario) throw new Error('Domiciliario no encontrado');
  const isMatch = await bcrypt.compare(password, domiciliario.contraseña);
  if (!isMatch) throw new Error('Contraseña incorrecta');
  const token = jwt.sign({ id: domiciliario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

module.exports = {
  authenticateCliente,
  authenticateEmpleado,
  authenticateDomiciliario
};
