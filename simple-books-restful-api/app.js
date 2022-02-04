const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const port = 3001
const uri = "mongodb+srv://yogesh:cluster0@nodejsprojects.txfj2.mongodb.net/BooksAPI?retryWrites=true&w=majority"
const Book = require("./models/bookmodel")

//connection

mongoose.connect(uri)
.then(()=>{
    console.log("MongoDb connected successfully");
})
.catch((err)=>{
    console.log(Error, err.message)
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

//importing routes

const routes = require("./routes/routes");
routes(app);

app.listen(port, ()=>{
    console.log(`The BookRestful API is listening on port ${port}`);
})