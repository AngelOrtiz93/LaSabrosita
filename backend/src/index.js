const express = require('express');
const cors = require('cors');
const path = require('path'); // Importar path
const sequelize = require('./config/db');

// Crear instancia de Express
const app = express();

// Configurar middleware
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Configurar middleware para headers JSON
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// Configurar archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Sirve archivos estáticos desde /uploads

// Importar modelos
require('./models/pedido');
require('./models/usuario');
require('./models/producto');
require('./models/detallePedido');
require('./models/Role');
require('./models/permission');
require('./models/rolePermission');
require('./models/UserRole'); // Asegúrate de que el modelo UserRole esté importado

// Definir relaciones entre modelos
const Usuario = require('./models/usuario');
const Pedido = require('./models/pedido');
const Producto = require('./models/producto');
const DetallePedido = require('./models/detallePedido');
const Role = require('./models/Role');
const Permission = require('./models/permission');
const RolePermission = require('./models/rolePermission');
const UserRole = require('./models/UserRole');

Usuario.hasMany(Pedido, { foreignKey: 'usuarioId' });
Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Usuario.belongsToMany(Role, { through: UserRole, foreignKey: 'userId' });
Role.belongsToMany(Usuario, { through: UserRole, foreignKey: 'roleId' });

Producto.hasMany(DetallePedido, { foreignKey: 'productoId' });
DetallePedido.belongsTo(Producto, { foreignKey: 'productoId' });

Pedido.hasMany(DetallePedido, { foreignKey: 'pedidoId' });
DetallePedido.belongsTo(Pedido, { foreignKey: 'pedidoId' });

Role.belongsToMany(Permission, { through: RolePermission, foreignKey: 'roleId' });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: 'permissionId' });

RolePermission.belongsTo(Permission, { foreignKey: 'permissionId' });

// Importar rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const domiciliariosRoutes = require('./routes/domiciliarioRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const productoRoutes = require('./routes/productoRoutes');
const detallePedidoRoutes = require('./routes/detallePedidoRoutes');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const rolePermissionRoutes = require('./routes/rolePermissionRoutes');
const userRoleRoutes = require('./routes/userRoleRoutes'); // Importar rutas de asignación de roles

// Configurar rutas
app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRoutes);
app.use('/clientes', clienteRoutes);
app.use('/domiciliarios', domiciliariosRoutes);
app.use('/empleados', empleadoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/productos', productoRoutes);
app.use('/detalle-pedidos', detallePedidoRoutes);
app.use('/roles', roleRoutes);
app.use('/permissions', permissionRoutes);
app.use('/role-permissions', rolePermissionRoutes);
app.use('/user-roles', userRoleRoutes); 

// Importar middleware
const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');

// Manejo de errores
app.use(errorMiddleware);

// Iniciar servidor
const startServer = async () => {
  try {
    await sequelize.sync({ alter: false });
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

startServer();
