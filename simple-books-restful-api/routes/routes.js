module.exports = (app) => {
    const booklist = require("../controllers/controllers");
    //routes
    app.route("/books").get(booklist.listallbooks)
    app.route("/books").post(booklist.createbooks)

    app.route("/books/:bookId").put(booklist.update_a_book)
    app.route("/books/:bookId").get(booklist.readabook)
    app.route("/books/:bookId").delete(booklist.delete_a_book)

};