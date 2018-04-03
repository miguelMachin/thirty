let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {type:String},
    passwd: {type:String},
    email: {type:String},
    country:{type:String},
    city:{type:String},
    mood:{type:String},
    favorites: [],
    interests: []
},{versionKey: false });

let User = mongoose.model('users',userSchema);

module.exports = User;


