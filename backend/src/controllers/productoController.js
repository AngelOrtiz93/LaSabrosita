const productoService = require('../services/productoService');

exports.getAllProductos = async (req, res) => {
  try {
    const productos = await productoService.getAllProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

exports.getProductoById = async (req, res) => {
  try {
    const producto = await productoService.getProductoById(req.params.id);
    if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

exports.createProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, imagenUrl } = req.body;  // Incluye imagenUrl
    const newProducto = await productoService.createProducto({ nombre, descripcion, precio, stock, imagenUrl });
    res.status(201).json(newProducto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
};

exports.updateProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, imagenUrl } = req.body;  // Incluye imagenUrl
    const updatedProducto = await productoService.updateProducto(req.params.id, { nombre, descripcion, precio, stock, imagenUrl });
    if (!updatedProducto) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(updatedProducto);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
};


exports.deleteProducto = async (req, res) => {
  try {
    const result = await productoService.deleteProducto(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};
