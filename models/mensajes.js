let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let mensajesSchema = new Schema({
    idUsuario: {type:String},
    passwd: {type:String},
    email: {type:String},
    mensaje:{type:String}
},{versionKey: false });

let Mensaje = mongoose.model('mensajes',mensajeSchema);

module.exports = Mensaje;