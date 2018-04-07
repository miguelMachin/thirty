const User = require('./../models/users');
const mongoose = require('./../config/conexion');

function getUserEmail(email){
    User.find({email: req.body.email} ,function(err,user){
        if (err) throw err;
        if (user.length > 0 ){
            
            return user[0].email;
        }
    });
}

function getUserEmailPasswd(email,passwd){
    User.find({$and: [{email:email},{passwd:passwd}]} ,function(err,user){
        if (err) throw err;
        if (user.length > 0 ){
            return {user:user[0]};
        }else{
            return false;
        }
    });
    
}

module.exports = {
    // getUser
    getUserEmail,
    getUserEmailPasswd,
   
 };