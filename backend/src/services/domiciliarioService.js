// src/services/domiciliarioService.js
const Domiciliario = require('../models/domiciliario');

exports.getAll = async () => {
  return await Domiciliario.findAll();
};

exports.getById = async (id) => {
  return await Domiciliario.findByPk(id);
};

exports.create = async (data) => {
  return await Domiciliario.create(data);
};

exports.update = async (id, updates) => {
  await Domiciliario.update(updates, { where: { id } });
  return await Domiciliario.findByPk(id);
};

exports.delete = async (id) => {
  const deleted = await Domiciliario.destroy({ where: { id } });
  return deleted;
};
