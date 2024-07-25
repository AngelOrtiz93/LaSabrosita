const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./config/db');

// Importar modelos
const Cliente = require('./models/cliente');
const Pedido = require('./models/pedido');
const Empleado = require('./models/empleado');
const Producto = require('./models/producto');
const DetallePedido = require('./models/detallePedido');
const Domiciliario = require('./models/domiciliario');

// Importar rutas y middlewares
const clienteRoutes = require('./routes/clienteRoutes');
const domiciliarioRoutes = require('./routes/domiciliarioRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const productoRoutes = require('./routes/productoRoutes');
const detallePedidoRoutes = require('./routes/detallePedidoRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes');

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Rutas públicas
app.use('/auth', authRoutes); // Incluye rutas de autenticación (login, forgot-password, etc.)

// Rutas privadas con autenticación requerida
app.use('/clientes', clienteRoutes);
app.use('/domiciliarios', authMiddleware, domiciliarioRoutes);
app.use('/empleados', authMiddleware, empleadoRoutes);
app.use('/pedidos', authMiddleware, pedidoRoutes);
app.use('/productos', authMiddleware, productoRoutes);
app.use('/detalle-pedidos', authMiddleware, detallePedidoRoutes);

// Definir relaciones
Cliente.hasMany(Pedido, { foreignKey: 'clienteId' });
Pedido.belongsTo(Cliente, { foreignKey: 'clienteId' });

Empleado.hasMany(Pedido, { foreignKey: 'empleadoId' });
Pedido.belongsTo(Empleado, { foreignKey: 'empleadoId' });

Domiciliario.hasMany(Pedido, { foreignKey: 'domiciliarioId' });
Pedido.belongsTo(Domiciliario, { foreignKey: 'domiciliarioId' });

Producto.hasMany(DetallePedido, { foreignKey: 'productoId' });
DetallePedido.belongsTo(Producto, { foreignKey: 'productoId' });

Pedido.hasMany(DetallePedido, { foreignKey: 'pedidoId' });
DetallePedido.belongsTo(Pedido, { foreignKey: 'pedidoId' });

// Aplicar middleware de manejo de errores
app.use(errorMiddleware);

// Sincronizar modelos con la base de datos y arrancar el servidor
sequelize.sync({ alter: true }).then(() => {
  const port = process.env.PORT || 3000; // Usar un puerto por defecto si no está definido
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(error => {
  console.error('Error syncing database:', error);
});
