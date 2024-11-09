const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('node_rest', 'mohan', 'mohan123', {
	host: 'localhost',
	dialect: 'mysql'
})


module.exports = sequelize;
