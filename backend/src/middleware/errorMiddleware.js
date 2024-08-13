// Middleware de manejo de errores
const errorHandler = (err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'Datos de entrada inválidos', details: err.errors });
  }

  if (err.name === 'DatabaseError') {
    return res.status(500).json({ error: 'Error de base de datos', details: err.message });
  }

  res.status(err.statusCode || 500).json({ error: err.message || 'Algo salió mal' });
};

module.exports = errorHandler;