const mongoose = require("mongoose");

const bookmodelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Enter Book Name"
    },
    isbn: {
        type: Number,
    },
    Created_At: {
        type: Date,
        default: Date.now
    },
    Status: {
        type:[{
            type: String,
            enum: ['pending', 'ongoing', 'completed']
        }],
        default: 'pending'
    }
});

module.exports = mongoose.model("Books", bookmodelSchema);