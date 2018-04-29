let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let messageSchema = new Schema({
    _id: Schema.Types.ObjectId,
    idUser: {type: Schema.Types.ObjectId, ref: "users"},
    text: {type:String},
    image: {type:String},
    date : {type: Date, default: Date.now}
},{versionKey: false });

let Message = mongoose.model('messages',messageSchema);

module.exports = Message;