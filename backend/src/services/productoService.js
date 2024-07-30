const Producto = require('../models/producto');

// Obtener todos los productos
const getAllProductos = async () => {
  try {
    return await Producto.findAll();
  } catch (error) {
    throw new Error('Error al obtener productos: ' + error.message);
  }
};

// Obtener un producto por ID
const getProductoById = async (id) => {
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) throw new Error('Producto no encontrado');
    return producto;
  } catch (error) {
    throw new Error('Error al obtener producto: ' + error.message);
  }
};

// Crear un nuevo producto
const createProducto = async (data) => {
  try {
    return await Producto.create(data);
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw new Error('Error al crear producto: ' + error.message);
  }
};

const updateProducto = async (id, data) => {
  try {
    const [updated] = await Producto.update(data, { where: { id } });
    if (!updated) throw new Error('Producto no encontrado');
    return await Producto.findByPk(id);
  } catch (error) {
    throw new Error('Error al actualizar producto: ' + error.message);
  }
};


// Eliminar un producto
const deleteProducto = async (id) => {
  try {
    const deleted = await Producto.destroy({ where: { id } });
    if (!deleted) throw new Error('Producto no encontrado');
    return { message: 'Producto eliminado exitosamente' };
  } catch (error) {
    throw new Error('Error al eliminar producto: ' + error.message);
  }
};

module.exports = {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
};
