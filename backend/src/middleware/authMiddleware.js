const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Extraer el token del encabezado 'Authorization'
  const token = req.headers['authorization']; // Obtiene el token directamente

  if (!token) return res.status(403).send('Token missing');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.user = user;
    next();
  });
};
