const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
	id: {
          type: DataTypes.INTEGER,
	  allowNull: false,
	  autoIncrement: true,
	  primaryKey: true
	},
	name: {
          type: DataTypes.STRING,
	  allowNull: false,
	},
       email: {
         type: DataTypes.STRING,
	 allowNull: false,
	 unique: true
       },
     },
    {
      tableName: 'Users',
      timestamps: true,

    }
)


module.exports = User;

