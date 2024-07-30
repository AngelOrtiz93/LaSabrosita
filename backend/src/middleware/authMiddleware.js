const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  // El token debería estar directamente en el encabezado
  const token = authHeader;

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado', error: err.message });
    }
    
    // Agregar el usuario al objeto request para su uso posterior
    req.user = user;
    next();
  });
};
