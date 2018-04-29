/*let mongoose = require('./../config/conexion');
let User = require('./../models/users');*/
const mongoose = require('./../config/conexion');
const User = require('./../models/users');
const Message = require('./../models/message');
const base64 = require('base-64');
//const multer = require('multer');
const fs = require('fs');
const moment = require('moment');
const interests = ["Anime","Manga","Comunicaciones","Literaratura","Internet"];
const country = {"SP":"España","UK":"Reino Unido","GER":"Alemania"};

//const upload = multer({dest: 'uploads/'}); 

//const formidable = require('formidable');
function initApp(req,res) {
    res.render("index",{message:""});

}

function login(req,res){
    let email = req.body.email;
    let passwd = req.body.passwd;
    User.find({$and: [{email:email},{passwd:passwd}]} ,function(err,user){
        if (err) console.log(err);
        if (user.length > 0 ){
            req.session.user = user[0];
            user = user[0];
            res.render('principal',{user:user});
        }else{
            res.render("index",{message:"USUARIO O CONTRASEÑA INCORRECTO",status:"error"});
        }
     });
}

function logout(req,res){
    req.session.user = null;
    res.redirect("/");
}

function vistaRegistro(req,res){
    res.render("registro",{message:"",interests:interests,country:country});

}

function registrar(req,res){
    User.find( {email:req.body.email} ,function(err,user){
        if(err) 
           throw err;

        if (user.length > 0){
            res.render("registro",{message:"Ya existe otra cuenta con ese Correo",interests:interests,country:country,status:"error"});
        }else{
            let insertUser = new User ({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name,
                passwd: req.body.passwd,
                email: req.body.email,
                country:req.body.country,
                city:req.body.city,
                mood:"Sin Estado",
                favorites: [],
                friends: [],
                friendPending: [],
                interests: req.body.interests,
                avatar:"",
                birthdate:req.body.birthdate,
                message:[]
            });
            insertUser.save(function(error) {
                 if (error) {
                     console.log(error);
                    res.render("registro",{message:"Problemas al registrar",interests:interests,country:country,status:"error"});  
                 }else{
                    res.render("registro",{message:"Registrado Correctamente",interests:interests,country:country,status:"correcto"});  
                 }
             });
        }   
    });
}

function vistaPrincipal(req ,res){
    if (req.session.user === undefined || req.session.user === null ){
        res.redirect("/");
    }else{
        res.render('principal',{user:req.session.user});
    }

}
/*
function existInterest(value,array){
    for (let i = 0; i < array.length; i++) {
        if(array[i] == value){
            return true;
        }
    }
    return false;
}
*/
function vistaUpdate (req, res){
    if (req.session.user === undefined || req.session.user === null ){
        res.redirect("/");
    }else{
        res.render("vistaUpdate",{user:req.session.user,message:""});     
    }
}

function updateName (req,res){
   // console.log(req.body.name);
    User.update({email: req.session.user.email }, { $set: { name: req.body.name }}, function(err,user){
        if (err) {
            throw err;
            res.render("respuestaVistaUpdate",{layout : false,message:"Problemas al intentar actualizar",status:"error"});
        }else{
            req.session.user.name = req.body.name;
            res.render("respuestaVistaUpdate",{layout : false,message:"Actualizado Correctamennte",status:"correcto"});
        }
    });
}

function updateMood (req,res){
    //console.log(req.body.mood);
    User.update({email: req.session.user.email }, { $set: { mood: req.body.mood }}, function(err,user){
        if (err) {
            throw err;
            res.render("respuestaVistaUpdate",{layout : false,message:"Problemas al intentar actualizar",status:"error"});
        }else{
            req.session.user.mood = req.body.mood;
            res.render("respuestaVistaUpdate",{layout : false,message:"Actualizado Correctamennte",status:"correcto"});
        }
    });
}

function updatePasswd (req, res){
    if (req.session.user === undefined){
        res.redirect("localhost:3000");
    }else{
        User.find( {email:req.session.user.email} ,function(err,user){
            if (err) {
                throw err;
                res.render("respuestaVistaUpdate",{layout : false,message:"Problemas al intentar actualizar",status:"error"});
            }

            if (user.length >0 ){
                if (user[0].passwd == req.body.oldPasswd){
                    User.update({email: req.session.user.email }, { $set: { passwd: req.body.newPasswd }}, function(err,user){

                        if (err) {
                            throw err;
                            res.render("respuestaVistaUpdate",{layout : false,message:"Problemas al intentar actualizar",status:"error"});
                        }else{
                            req.session.user.passwd = req.body.newPasswd;
                            res.render("respuestaVistaUpdate",{layout : false,message:"Actualizado Correctamennte",status:"correcto"});
                        }
                    });
                }else{
                    res.render("respuestaVistaUpdate",{layout : false,message:"la contraseña introducida no es correcta",status:"error"});
                }      
            }
        });  
    }
}

function updateAvatar(req,res){
    let ext = req.file.originalname.split(".");
    let user = req.session.user;
    let imageAsBase64 = fs.readFileSync(req.file.path, 'base64');
    user.avatar = imageAsBase64;
    fs.unlinkSync(req.file.path);
    User.update({email: user.email }, { $set: { avatar: imageAsBase64 }}, function(err,user){
        if (err) {
            console.log(err);
        }
        else{
            //user.ext = user._id+"."+ext[1];;
            res.render("respuestaVistaUpdate",{layout : false,message:"Actualizado Correctamennte",status:"correcto"});
        }      
            
    });
    
}

function changeAvatar(req,res){
    let ext = req.file;
    let imageAsBase64 = fs.readFileSync(req.file.path, 'base64');
    fs.unlinkSync(req.file.path);
    res.render("respuestaVistaAvatar",{layout:false,img:imageAsBase64});
}

function vistaBuscar(req,res){
    if (req.session.user === undefined || req.session.user === null ){
        res.redirect("/");
    }else{
        res.render("vistaBuscar");
    }
}

function searchAll(req,res){
    User.find({_id:{$ne:req.session.user._id}},function(err,peoples){
        if (err)
            console.log(err);    
        User.findById(req.session.user._id,function(err,user){
            if (err)
                console.log(err);
            let friends = new Array();
            let dummy ="";
            for (let i = 0; i < peoples.length; i++) {
                if (isFriend(peoples[i],user.friend)){
                    dummy = {user:peoples[i],isFriend:true};
                }else{
                    dummy = {user:peoples[i],isFriend:false};
                }
                friends.push(dummy);
            }
           res.render("respuestaBuscar",{layout:false,users:friends});
        });
    });  
}

function isFriend(user,array){
    for (let i = 0; i < array.length; i++) {
        if(user._id.equals(array[i])){
            return true;
        }
    }
    return false;
}

function searchPerson(req,res){
   // console.log(req.body.name);
   User.find({
       $and: [
           {_id:{$ne:req.session.user._id}},
           {name:{$regex: '.*' + req.body.name + '.*'}}
        ]},function(err,user){
        if (err)
            res.render("respuestaBuscar",{layout:false,users:user});
    });
}

//$and:[{name:{$regex: '.*' + req.body.name + '.*'},{_id:{$ne:req.session.user._id}}]
function perfilPerson(req,res){
    //console.log(req.params.tagId);
    User.findById(req.body.id,function(err,user){
        if (err)
            console.log(err);
            let friends = false;
         // console.log(user);
            for (let i = 0; i < user.friend.length; i++) {
                if (user.friend[i].equals(req.session.user._id)){
                    friends = true;
                }
            }
            console.log(friends);
        res.render("vistaPersona",{layaout:false,user:user,friend:friends});

    });  
}

function addFriendPeding(req,res){
    User.find({$and:[{_id:req.body.id},{friendPending:req.session.user._id}]},function(err,userB){
        if(userB.length  == 0){
            User.update({_id:req.body.id  }, { $push: { friendPending:req.session.user._id}}, function(err,user){
                if(err)
                    console.log(err);
                //console.log(user);
            });
        }

    });
   
}

/*function addFriend(req,res){
    User.update({_id:req.body.id  }, { $push: { friendPending:req.session.user._id}}, function(err,user){
        if(err)
            console.log(err);
        console.log(user);
    });
}*/

function seeRequests(req,res){
    User.findById(req.session.user._id).populate('friendPending').exec(function(err,userF){
        //console.log(userF);
        if(err)
            console.log(err);
        else
            res.render("respuestaPeticiones",{layaout:false,user:userF.friendPending});


    });
}

function addFriend(req, res){
    User.update({_id:req.session.user._id},{$push: {friend:req.body.id}},function(err,user){
        if (err)
            console.log(err)
            res.send({ok:"ok"});
    });
    User.update({_id:req.session.user._id},{$pull: {friendPending:req.body.id}},function(err,user){
        if (err)
            console.log(err)     
    });
    User.update({_id:req.body.id},{$push: {friend:req.session.user._id}},function(err,user){
        if (err)
            console.log(err)
    });
}

function removeFriendPeding(req, res){
    User.update({_id:req.session.user._id},{$pull: {friendPending:req.body.id}},function(err,user){
        if (err)
            console.log(err)
        
        res.send({ok:"ok"});
    });
}

function removeFriend(req, res){
    User.update({_id:req.session.user._id},{$pull: {friend:req.body.id}},function(err,user){
        if (err)
            console.log(err)
            res.send({ok:"ok"});
    });
    User.update({_id:req.body.id},{$pull: {friend:req.session.user._id}},function(err,user){
        if (err)
            console.log(err)
    });
}

function addMessage(req,res){
    let text = req.body.text.split(" ");
    for (let i = 0; i < text.length; i++) {
        if (text[i].includes("http://") || text[i].includes("https://")){
            text[i] = "<a href=\""+text[i]+"\">"+text[i]+"</a>"; 
        }
    }
    text = text.join(" ");
    let img = "";
    if (req.file != undefined){
        let imageAsBase64 = fs.readFileSync(req.file.path, 'base64');
        img = imageAsBase64;
        fs.unlinkSync(req.file.path);
    }

    let id = mongoose.Types.ObjectId(); 
    let newMessage = new Message({
        _id: id,
        idUser: req.session.user._id,
        text: text,
        image: img,
        date : new Date()
    });
    newMessage.save(function(error) {
        if(error) console.log(error);
    });
    User.update({_id:req.session.user._id},{$push:{messages:id}},function(err,act){
        if (err) console.log(err);

        console.log(act);
        res.send({ok:"ok"});
    });

}

function searchAllMessages(req,res){
    User.findById(req.session.user._id).exec(function(err,user){
        if (err) console.log(err);
        let arrayMes = new Array();
        Message.find({$or:[
            {idUser:{$in:user.friend}},
            {idUser:req.session.user._id}
        ]}).populate("idUser").sort({date:-1}).exec(function(err,mes){
            if (err) console.log(err);
            for (let i = 0; i < mes.length; i++) {
                let aux = {message:mes[i],dateCompare:formatDate(mes[i].date)};
                arrayMes.push(aux);
            }
            res.render("respuestaMensajes",{layaout:false,message:arrayMes});
        });
    });  
}

function formatDate(date){
    let dateFormat = "YYYY-MM-DD H:m:s";
    let day = date.getDate().length == 1 ? "0"+date.getDate() : date.getDate();
    let month = ""+(date.getMonth()+1).length == 1 ? "0"+date.getMonth()+1 : date.getMonth()+1;
    let hours = date.getHours().length == 1 ? "0"+date.getHours() : date.getHours();
    let min = date.getMinutes().length == 1 ? "0"+date.getMinutes() : date.getMinutes();
    let sec = date.getSeconds().length == 1 ? "0"+date.getSeconds() : date.getSeconds();
    let dateCompare = date.getFullYear()+"-"+month+"-"+day+" "+hours+":"+min+":"+sec;
    return moment(dateCompare,dateFormat).locale('es').fromNow();
}

module.exports = {
   // getUser
   initApp,
   login,
   logout,
   vistaRegistro,
   registrar,
   vistaUpdate,
   updatePasswd,
   vistaPrincipal,
   updateName,
   updateAvatar,
   updateMood,
   changeAvatar,
   vistaBuscar,
   searchAll,
   perfilPerson,
   searchPerson,
   addFriendPeding,
   seeRequests,
   addFriend,
   removeFriendPeding,
   removeFriend,
   addMessage,
   searchAllMessages
   
};