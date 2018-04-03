const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    nombre: {type:String},
    passwd: {type:String},
    email: {type:String},
    intereses: [{type:String}],
    favoritos: [{type:String}]
    
},{versionKey: false });

const Usuario = mongoose.model('Users',usuarioSchema);

module.exports = Usuario;
