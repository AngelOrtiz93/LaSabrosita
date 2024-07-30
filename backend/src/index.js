const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

// Importar modelos y rutas
require('./models/cliente');
require('./models/pedido');
require('./models/empleado');
require('./models/producto');
require('./models/detallePedido');
require('./models/domiciliario');
require('./models/Role');
require('./models/permission');
require('./models/rolePermission');

const clienteRoutes = require('./routes/clienteRoutes');
const domiciliarioRoutes = require('./routes/domiciliarioRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const productoRoutes = require('./routes/productoRoutes');
const detallePedidoRoutes = require('./routes/detallePedidoRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const roleRoutes = require('./routes/roleRoutes');
const permissionRoutes = require('./routes/permissionRoutes'); 
const rolePermissionRoutes = require('./routes/rolePermissionRoutes')

const app = express();

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Rutas
app.use('/auth', authRoutes); 
app.use('/clientes', clienteRoutes);
app.use('/domiciliarios', authMiddleware, domiciliarioRoutes);
app.use('/empleados', authMiddleware, empleadoRoutes);
app.use('/pedidos', authMiddleware, pedidoRoutes);
app.use('/productos', authMiddleware, productoRoutes);
app.use('/detalle-pedidos', authMiddleware, detallePedidoRoutes);
app.use('/roles', authMiddleware, roleRoutes);
app.use('/permissions', authMiddleware, permissionRoutes);
app.use('/role-permissions', authMiddleware, rolePermissionRoutes);


// Definir relaciones
const Cliente = require('./models/cliente');
const Pedido = require('./models/pedido');
const Empleado = require('./models/empleado');
const Producto = require('./models/producto');
const DetallePedido = require('./models/detallePedido');
const Domiciliario = require('./models/domiciliario');
const Role = require('./models/Role');
const Permission = require('./models/permission');
const RolePermission = require('./models/rolePermission');

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

Cliente.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(Cliente, { foreignKey: 'roleId' });

Domiciliario.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(Domiciliario, { foreignKey: 'roleId' });

Empleado.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(Empleado, { foreignKey: 'roleId' });

Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'roleId' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permissionId' });

RolePermission.belongsTo(Permission, { foreignKey: 'permissionId' });


// Aplicar middleware de manejo de errores
app.use(errorMiddleware);

// Sincronizar modelos y arrancar el servidor
const startServer = async () => {
  try {
    await sequelize.sync({ alter: true });
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

startServer();
