'use strict';
  
  module.exports = {
    up: async (queryInterface, Sequelize) => {
      return queryInterface.createTable('system_config', { 
  id: {
          type: Sequelize.TINYINT,
          allowNull: false,
        },
attribute: {
          type: Sequelize.STRING,
          allowNull: false,
        },
value: {
          type: Sequelize.JSON,
          allowNull: false,
        },

      });
    },
  
    down: async (queryInterface, Sequelize) => {
      return queryInterface.dropTable('system_config');
    }
  };