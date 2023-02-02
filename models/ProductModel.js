const sequelize = require('../config/db')

const { DataTypes } = require('sequelize');


const Product= sequelize.define(
   'Product', 
   {
      product_name: {
         type: DataTypes.STRING,
         allowNull: false,
         
      },
      product_line: {
         type: DataTypes.STRING,
         allowNull: false,
         
      },
      unit_price: {
         type: DataTypes.INTEGER,
         allowNull: false
      },
      pack_price: {
         type: DataTypes.INTEGER
      },
      batchId: {
          type: DataTypes.BIGINT,
          allowNull: false
      },
      pack : {
          type: DataTypes.INTEGER,
          
      },
      

   },
   
     
   
   );

  

   module.exports=   Product;
