const Sequelize = require("sequelize");



const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, "", {
  dialect: "mysql",
});


sequelize
  .authenticate()
  .then(() => {
    console.log("connection made successfully");
  })
  .catch((err) => console.log(err, "this has a error"));


module.exports = sequelize;


