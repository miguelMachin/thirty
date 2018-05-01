let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let notificationSchema = new Schema({
    _id: Schema.Types.ObjectId,
    idUserOrigen: {type: Schema.Types.ObjectId, ref: "users"},
    idUserDest: {type: Schema.Types.ObjectId, ref: "users"},
    read: {type:boolean}
},{versionKey: false });

let notification = mongoose.model('notificatios',notificationSchema);

module.exports = notification;