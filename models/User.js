const sequelize = require('../config/db')
const Sequelize = require("sequelize");


const user_table = sequelize.define(
   'user', 
   {
      username: {
         type: Sequelize.STRING,
         allowNull: false,
         unique: true
      },
      email: {
         type: Sequelize.STRING,
         allowNull: false,
         isEmail: true,
      },
      password: {
         type: Sequelize.STRING,
         allowNull: false
      },
   },
   { tableName: "user_table" },
     
   
   );

   user_table.sync()

   module.exports=user_table