const Sequelize = require('sequelize'); 

const sequelize = require('../database'); 

const Product = sequelize.define('images', { 
    id: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        allowNull: false, 
        primaryKey: true
    },  
    title: Sequelize.STRING,  
    imageUrl: { 
        type: Sequelize.STRING, 
        allowNull: false
    }, 
    description: { 
        type: Sequelize.STRING, 
        allowNull: false

    },  
    uploader: { 
        type: Sequelize.STRING, 
        allowNull: false, 
    }


}); 

module.exports = Product;