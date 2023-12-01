const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfesorSchema = new Schema({
    profesor: String,
    telefono: Number,
    correo: String,
    iae: Number,
    materias: Array
}, {versionKey:false})

module.exports = mongoose.model('profesores', ProfesorSchema)