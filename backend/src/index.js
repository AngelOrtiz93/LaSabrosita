const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

// Importar modelos y rutas
require('./models/pedido');
require('./models/usuario'); // Cambiar el modelo a usuario
require('./models/producto');
require('./models/detallePedido');
require('./models/Role');
require('./models/permission');
require('./models/rolePermission');

const usuarioRoutes = require('./routes/usuarioRoutes'); // Cambiar ruta a usuarioRoutes
const clienteRoutes = require('./routes/clienteRoutes'); // Importar rutas de clientes
const domiciliariosRoutes = require('./routes/domiciliarioRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const productoRoutes = require('./routes/productoRoutes');
const detallePedidoRoutes = require('./routes/detallePedidoRoutes');
const authRoutes = require('./routes/authRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const roleRoutes = require('./routes/roleRoutes');
const permissionRoutes = require('./routes/permissionRoutes'); 
const rolePermissionRoutes = require('./routes/rolePermissionRoutes');

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
app.use('/usuarios', authMiddleware, usuarioRoutes); // Cambiar ruta a usuarios
app.use('/clientes', authMiddleware, clienteRoutes); // Agregar ruta de clientes
app.use('/domiciliarios', authMiddleware, domiciliariosRoutes); // Agregar ruta de clientes
app.use('/empleados', authMiddleware, empleadoRoutes);
app.use('/pedidos', authMiddleware, pedidoRoutes);
app.use('/productos', authMiddleware, productoRoutes);
app.use('/detalle-pedidos', authMiddleware, detallePedidoRoutes);
app.use('/roles', authMiddleware, roleRoutes);
app.use('/permissions', authMiddleware, permissionRoutes);
app.use('/role-permissions', authMiddleware, rolePermissionRoutes);

// Definir relaciones
const Pedido = require('./models/pedido');
const Usuario = require('./models/usuario'); // Cambiar modelo a usuario
const Producto = require('./models/producto');
const DetallePedido = require('./models/detallePedido');
const Role = require('./models/Role');
const Permission = require('./models/permission');
const RolePermission = require('./models/rolePermission');

// Relación de uno a muchos entre Usuario y Pedido
Usuario.hasMany(Pedido, { foreignKey: 'usuarioId' });
Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Producto.hasMany(DetallePedido, { foreignKey: 'productoId' });
DetallePedido.belongsTo(Producto, { foreignKey: 'productoId' });

Pedido.hasMany(DetallePedido, { foreignKey: 'pedidoId' });
DetallePedido.belongsTo(Pedido, { foreignKey: 'pedidoId' });

Usuario.belongsTo(Role, { foreignKey: 'roleId' }); // Cambiar empleado a usuario
Role.hasMany(Usuario, { foreignKey: 'roleId' }); // Cambiar empleado a usuario

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
