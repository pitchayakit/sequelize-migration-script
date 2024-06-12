const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'mysql',
});

const migrationPath = './migrations';

if (!fs.existsSync(migrationPath)) {
    fs.mkdirSync(migrationPath);
}

fs.readdirSync(migrationPath).forEach(file => {
    fs.unlinkSync(path.join(migrationPath, file));
});


const modelsDirectory = path.join(__dirname, 'models');

fs.readdir(modelsDirectory, (err, files) => {
    if (err) throw err;
  
    files.forEach(file => {
        if(file == "init-models.js") {
            return;
        }
      const defineModel = require(path.join(modelsDirectory, file));
      const model = defineModel(sequelize, Sequelize.DataTypes);
      const tableName = model.options.tableName;
      const attributes = model.rawAttributes;
  
      let fields = '';
  
      for (let attributeName in attributes) {
        const attribute = attributes[attributeName];
        let attributeType = `type: Sequelize.${attribute.type.key}`;
      
        if (attribute.type.key === 'ENUM') {
          attributeType += `, values: ${JSON.stringify(attribute.type.values)}`;
        }
      
        fields += `${attributeName}: {
          ${attributeType},
          allowNull: ${attribute.allowNull},
        },\n`;
      }
  
      const template = `'use strict';
  
  module.exports = {
    up: async (queryInterface, Sequelize) => {
      return queryInterface.createTable('${tableName}', { 
  ${fields}
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      return queryInterface.dropTable('${tableName}');
    }
  };`
  
      fs.writeFileSync(`./migrations/${Date.now()}-create-${tableName}.js`, template);
    });
});