const mongoose  = require('mongoose');
const book = mongoose.model("Books");

exports.listallbooks = (req,res) => {
    book.find({}, (err,books)=>{
        if(err){
            res.send(err);
        }else{
            res.json(books);
        }
    });
};

exports.createbooks = (req,res) =>{
    const newbook = new book(req.body);
    newbook.save((err, books) => {
        if(err){
            res.send(err)
        }else{
            res.json(books)
        }
    });
};

exports.readabook = (req,res) => {
        book.findOne(req.params.name, (err,singlebook)=>{
        if(err){
            res.send(err);
        }else{
            res.json(singlebook);
        }
    });
};

exports.update_a_book = (req, res) => {
    book.findOneAndUpdate({_id: req.params.bookId}, req.body, {new: true}, (err, books) => {
       if (err)
         res.send(err);
       res.json(books);
     });
   };

   exports.delete_a_book = (req, res) => {
    book.deleteOne({
      _id: req.params.bookId
    }, (err, books) => {
      if (err)
        res.send(err);
      res.json({ message: 'Book successfully deleted' });
    });
  };