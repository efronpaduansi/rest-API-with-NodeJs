const sequelize = require("sequelize");
const db = new sequelize("learn_nodejs", "admin", "root", {
    host: 'localhost',
    dialect: 'mysql'
});

    // Connection checking
    try{
        db.authenticate();
        console.log('Database connection successfully!');
    }catch (error){
        console.error('Unable to connect to the database: ', error);
    }

db.sync({});

module.exports = db;