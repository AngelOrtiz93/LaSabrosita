module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pedidos', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      clienteId: {
        type: Sequelize.UUID,
        references: {
          model: 'Clientes',
          key: 'id'
        },
        allowNull: false
      },
      empleadoId: {
        type: Sequelize.UUID,
        references: {
          model: 'Empleados',
          key: 'id'
        },
        allowNull: true
      },
      domiciliarioId: {
        type: Sequelize.UUID,
        references: {
          model: 'Domiciliarios',
          key: 'id'
        },
        allowNull: true
      },
      fechaPedido: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: true
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
    await queryInterface.dropTable('pedidos');
  }
};
