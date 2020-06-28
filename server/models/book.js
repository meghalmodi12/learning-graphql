const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    genre: {
        type: String,
        trim: true
    },
    authorId: {
        type: String
    }
});

module.exports = mongoose.model('Book', bookSchema);