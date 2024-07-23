const productoService = require('../services/productoService');

exports.getAllProductos = async (req, res) => {
  try {
    const productos = await productoService.getAllProductos();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching productos' });
  }
};

exports.getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await productoService.getProductoById(id);
    if (!producto) return res.status(404).json({ error: 'Producto not found' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching producto' });
  }
};

exports.createProducto = async (req, res) => {
  try {
    const newProducto = await productoService.createProducto(req.body);
    res.status(201).json(newProducto);
  } catch (error) {
    res.status(500).json({ error: 'Error creating producto' });
  }
};

exports.updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProducto = await productoService.updateProducto(id, req.body);
    if (!updatedProducto) return res.status(404).json({ error: 'Producto not found' });
    res.json(updatedProducto);
  } catch (error) {
    res.status(500).json({ error: 'Error updating producto' });
  }
};

exports.deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await productoService.deleteProducto(id);
    if (!deleted) return res.status(404).json({ error: 'Producto not found' });
    res.status(200).json({ message: 'Producto deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting producto' });
  }
};
