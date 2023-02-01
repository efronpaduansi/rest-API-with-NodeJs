const {Sequelize, DataTypes} = require("sequelize");
const db = require("../config/database.js");

// deklarasi tabel
const Book = db.define('book', {
        title: {type: Sequelize.STRING},
        author: {type: Sequelize.STRING},
        price:{type: Sequelize.INTEGER}
    },
    {
        freezeTableName: true
    }
);

module.exports = Book;