const Producto = require('../models/producto'); // Importa Producto en lugar de { Producto }

// Obtener todos los productos
const getAllProductos = async () => {
  return await Producto.findAll();
};

// Obtener un producto por ID
const getProductoById = async (id) => {
  return await Producto.findByPk(id);
};

// Crear un nuevo producto
const createProducto = async (data) => {
  return await Producto.create(data);
};

// Actualizar un producto
const updateProducto = async (id, data) => {
  const producto = await Producto.findByPk(id);
  if (!producto) throw new Error('Producto no encontrado');
  return await producto.update(data);
};

// Eliminar un producto
const deleteProducto = async (id) => {
  const producto = await Producto.findByPk(id);
  if (!producto) throw new Error('Producto no encontrado');
  return await producto.destroy();
};

module.exports = {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
};
