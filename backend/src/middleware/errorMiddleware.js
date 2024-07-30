module.exports = (err, req, res, next) => {
  // Log del error para depuración
  console.error('Error:', err.message || err);

  // Verificar el tipo de error y devolver un mensaje adecuado
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: 'Datos de entrada inválidos', details: err.errors });
  }

  if (err.name === 'DatabaseError') {
    return res.status(500).json({ error: 'Error de base de datos', details: err.message });
  }

  // Mensaje genérico para errores no específicos
  res.status(err.statusCode || 500).json({ error: err.message || 'Algo salió mal' });
};
