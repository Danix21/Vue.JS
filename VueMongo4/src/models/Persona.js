const mongoose = require('mongoose');
const { Schema } = mongoose;

const Persona = new Schema({
    nombre: String,
    apellido: String,
    fechadenacimiento: Date,
    mail: String,
    dni: Number
});

module.exports = mongoose.model('Persona', Persona);