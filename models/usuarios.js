let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {type:String},
    passwd: {type:String},
    email: {type:String},
    intereses: [{type:String}],
    favoritos: [{type:String}]
    
},{versionKey: false });

let Usuario = mongoose.model('usuarios',usuarioSchema);

module.exports = Usuario;
