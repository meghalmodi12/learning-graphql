const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    gener: {
        type: String,
        trim: true
    },
    authorId: {
        type: String
    }
});

module.exports = mongoose.model('Book', bookSchema);