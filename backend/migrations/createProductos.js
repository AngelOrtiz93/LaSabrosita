// migrations/createProductos.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Productos', {
        ID_Producto: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        Nombre: {
          type: Sequelize.STRING,
          allowNull: false
        },
        Descripcion: {
          type: Sequelize.STRING,
          allowNull: true
        },
        Precio: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false
        },
        Stock: {
          type: Sequelize.INTEGER,
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
      await queryInterface.dropTable('Productos');
    }
  };
  