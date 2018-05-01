let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: {type:String},
    passwd: {type:String},
    email: {type:String},
    country:{type:String},
    city:{type:String},
    mood:{type:String},
    favorites:[{type: Schema.Types.ObjectId, ref: "messages"}],
    interests: [],
    friend: [{type: Schema.Types.ObjectId, ref: "users" }],
    friendPending: [{ type: Schema.ObjectId, ref: "users" }],
    avatar : {type:String},
    birthdate : {type: Date},
    messages:[{type: Schema.Types.ObjectId, ref: "messages"}]
    
},{versionKey: false });

let User = mongoose.model('users',userSchema);


module.exports = User;


