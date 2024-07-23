const express = require('express');
const app = express();
const sequelize = require('./config/db');
const Cliente = require('./models/cliente');
const Pedido = require('./models/pedido');
const Empleado = require('./models/empleado');
const Producto = require('./models/producto');
const DetallePedido = require('./models/detallePedido');
const Domiciliario = require('./models/domiciliario');

// Importar todas las rutas y middlewares
const clienteRoutes = require('./routes/clienteRoutes');
const domiciliarioRoutes = require('./routes/domiciliarioRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const productoRoutes = require('./routes/productoRoutes');
const detallePedidoRoutes = require('./routes/detallePedidoRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes'); // Añadido

app.use(express.json());
app.use('/auth', authRoutes); // Añadido
app.use('/clientes', clienteRoutes);
app.use('/domiciliarios', domiciliarioRoutes);
app.use('/empleados', empleadoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/productos', productoRoutes);
app.use('/detalle-pedidos', detallePedidoRoutes);

// Define las relaciones
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

// Aplicar middleware de autenticación después de las rutas públicas
app.use(authMiddleware); 
app.use(errorMiddleware); 

sequelize.sync({ alter: true }).then(() => { 
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}).catch(error => {
  console.error('Error syncing database:', error);
});
