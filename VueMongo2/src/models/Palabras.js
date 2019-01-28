const mongoose = require('mongoose');
const { Schema } = mongoose;

const Palabra = new Schema({
    palabra: String,
    significado: String,
    ejemplo: String,
    lengua: String
});

module.exports = mongoose.model('Palabra', Palabra);