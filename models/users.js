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
    interests: [],
    friend: [{type: Schema.Types.ObjectId, ref: 'users' }],
    ext : {type:String}
},{versionKey: false });

let User = mongoose.model('users',userSchema);

module.exports = User;


