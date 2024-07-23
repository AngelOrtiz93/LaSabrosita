// migrations/createDetallePedidos.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('DetallePedidos', {
        ID_Detalle: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        ID_Pedido: {
          type: Sequelize.UUID,
          references: {
            model: 'Pedidos',
            key: 'ID_Pedido'
          },
          allowNull: false
        },
        ID_Producto: {
          type: Sequelize.UUID,
          references: {
            model: 'Productos',
            key: 'ID_Producto'
          },
          allowNull: false
        },
        Cantidad: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        Precio: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        }
      });
    },
  
    down: async (queryInterface) => {
      await queryInterface.dropTable('DetallePedidos');
    }
  };
  