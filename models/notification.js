let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let notificationSchema = new Schema({
    _id: Schema.Types.ObjectId,
    idUserOrigen: {type: Schema.Types.ObjectId, ref: "users"},
    idUserDest: {type: Schema.Types.ObjectId, ref: "users"},
    idMessage: {type: Schema.Types.ObjectId, ref: "messages"},
    date : {type: Date, default: Date.now},
    read: {type:Boolean}
},{versionKey: false });

let Notification = mongoose.model('notifications',notificationSchema);

module.exports = Notification;