const { authenticateCliente, authenticateEmpleado, authenticateDomiciliario } = require('../services/authService');

const login = async (req, res) => {
  const { email, password, userType } = req.body;
  try {
    let token;
    if (userType === 'cliente') {
      token = await authenticateCliente(email, password);
    } else if (userType === 'empleado') {
      token = await authenticateEmpleado(email, password);
    } else if (userType === 'domiciliario') {
      token = await authenticateDomiciliario(email, password);
    } else {
      return res.status(400).json({ message: 'Tipo de usuario no válido' });
    }
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  login,
};
