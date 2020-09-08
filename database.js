const Sequelize = require('sequelize'); 

const sequelize = new Sequelize('img_repo', 'root','imagerepository', {dialect: 'mysql', host: 'localhost'}); 

module.exports = sequelize;