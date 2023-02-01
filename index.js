const express = require("express");
const { where } = require("sequelize");
const app = express();
const db = require("./app/config/database.js");

app.use(express.urlencoded({extended: true}));

const Book = require("./app/models/BookModel.js");

// get all books
app.get("/", async (req, res) => {
    try {
        const books = await Book.findAll({});
        res.json(books);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error!");
    }
})

// get one book by id
app.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findOne({
            where: {id:id}
        });
        res.json(book);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error!");
    }
})

// store a new book
app.post("/save", async (req, res) => {
    try {
        const {title, author, price} = req.body;

        const newBook = new Book({
            title,
            author,
            price
        });

        await newBook.save();
        res.json(newBook);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error")
    }
})

// destory a book
app.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.destroy({
            where: {id: id}
        });
        await book;
        res.json("Berhasil menghapus data!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error!");
    }
})

// update a book
app.put("/:id", async (req, res) => {
    try {
        // deklarasi field
        const {title, author, price} = req.body;
        const id = req.params.id;

        const book = await Book.update({
            title,
            author,
            price
        }, {where: {id:id}});
        await book;
        res.json("Berhasil mengubah data!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal server error!");
    }
})

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});