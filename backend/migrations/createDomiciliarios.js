// migrations/createDomiciliarios.js
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Domiciliarios', {
        ID_Domiciliario: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        Nombre: {
          type: Sequelize.STRING,
          allowNull: false
        },
        Apellido: {
          type: Sequelize.STRING,
          allowNull: false
        },
        Email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        Telefono: {
          type: Sequelize.STRING,
          allowNull: true
        },
        Direccion: {
          type: Sequelize.STRING,
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
      await queryInterface.dropTable('Domiciliarios');
    }
  };
  