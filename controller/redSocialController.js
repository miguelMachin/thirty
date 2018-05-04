/*let mongoose = require('./../config/conexion');
let User = require('./../models/users');*/
const socketApi = require('./socketApi');
const mongoose = require('./../config/conexion');
const User = require('./../models/users');
const Message = require('./../models/message');
const Notification = require('./../models/notification');
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
    let arrayAux = new Array();
    User.find({$and: [{email:email},{passwd:passwd}]} ,function(err,user){
        if (err) console.log(err);
        if (user.length > 0 ){
            req.session.user = user[0];
            req.session.date = formaDateBirthdate(user[0].birthdate);
            res.render('principal',{user:req.session.user,date:req.session.date});
        }else{
            res.render("index",{message:"USUARIO O CONTRASEÑA INCORRECTO",status:"error"});
        }
     });
}

function formaDateBirthdate(date){
    let day = date.getDate() < 10 ? "0"+date.getDate() : date.getDate();
    let month = (date.getMonth()+1) < 10 ? "0"+(date.getMonth()+1) : (date.getMonth()+1);
    let dateCompare =+day+"/"+month+"/"+date.getFullYear();
    return dateCompare;
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
        res.render('principal',{user:req.session.user,date:req.session.date});
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
        res.render("vistaUpdate",{user:req.session.user,date:req.session.date,message:""});     
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
    let mood = req.body.mood.split(" ");
    for (let i = 0; i < mood.length; i++) {
        if(mood[i].includes("http") || mood[i].includes("https")){
            mood[i] = "<a href="+mood[i]+">"+mood[i]+"</a>";
        }    
    }
    mood = mood.join(" ");
    User.update({email: req.session.user.email }, { $set: { mood: mood }}, function(err,user){
        if (err) {
            throw err;
            res.render("respuestaVistaUpdate",{layout : false,message:"Problemas al intentar actualizar",status:"error"});
        }else{
            req.session.user.mood = mood;
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
    console.log("entre");
    let imageAsBase64 = fs.readFileSync(req.file.path, 'base64');
    user.avatar = imageAsBase64;
    fs.unlinkSync(req.file.path);
    User.update({email: user.email }, { $set: { avatar: imageAsBase64 }}, function(err,user){
        if (err) {
            console.log(err);
        }
        else{
            //user.ext = user._id+"."+ext[1];;
            console.log("entre");
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
                if (isSome(peoples[i],user.friend)){
                    dummy = {user:peoples[i],isFriend:true,date:formaDateBirthdate(peoples[i].birthdate)};
                }else{
                    dummy = {user:peoples[i],isFriend:false,date:formaDateBirthdate(peoples[i].birthdate)};
                }
                friends.push(dummy);
            }
           res.render("respuestaBuscar",{layout:false,users:friends});
        });
    });  
}

function isSome(user,array){
    for (let i = 0; i < array.length; i++) {
        if(user._id.equals(array[i])){
            return true;
        }
    }
    return false;
}

function searchPerson(req,res){
    let arrayUser = new Array();
   User.find({
       $and: [
           {_id:{$ne:req.session.user._id}},
           {name:{$regex: '.*' + req.body.name + '.*'}}
        ]},function(err,peoples){
        if (err)
            console.log(err);
        User.findById(req.session.user._id,function(err,user){
            if (err)
                console.log(err);
            let friends = new Array();
            let dummy ="";
            for (let i = 0; i < peoples.length; i++) {
                if (isSome(peoples[i],user.friend)){
                    dummy = {user:peoples[i],isFriend:true,date:formaDateBirthdate(peoples[i].birthdate)};
                }else{
                    dummy = {user:peoples[i],isFriend:false,date:formaDateBirthdate(peoples[i].birthdate)};
                }
                friends.push(dummy);
            }
               res.render("respuestaBuscar",{layout:false,users:friends});
        });
    });
}

function perfilPerson(req,res){
    console.log(req.body.id);
    console.log(req.session.user._id);
    if(req.body.id == req.session.user._id){
        socketApi.update("notUpdate");
        res.render("principal",{layout:false,user:req.session.user,date:req.session.date});
    }

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
            let date = formaDateBirthdate(user.birthdate);

        res.render("vistaPersona",{layout:false,user:user,friend:friends,date:date});

    });  
}

function addFriendPeding(req,res){
    User.find({$and:[{_id:req.body.id},{friendPending:req.session.user._id}]},function(err,userB){
        if(userB.length  == 0){
            User.update({_id:req.body.id  }, { $push: { friendPending:req.session.user._id}}, function(err,user){
                if(err)
                    console.log(err);
                    socketApi.update("updateFriend");
                //console.log(user);
            });
        }

    });
   
}

function seeRequests(req,res){
    User.findById(req.session.user._id).populate('friendPending').exec(function(err,userF){
        //console.log(userF);
        if(err)
            console.log(err);
        else
            res.render("respuestaPeticiones",{layout:false,user:userF.friendPending});


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

        socketApi.update("updateMessage");
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
            let aux = "";
            for (let i = 0; i < mes.length; i++) {
                let isFavorite = false;
                let myMessage = false;
                if(isSome(mes[i],user.favorites)){
                   isFavorite = true; 
                }
                if(mes[i].idUser._id.equals(req.session.user._id)){
                    myMessage = true; 
                }
                aux = {message:mes[i],dateCompare:formatDateMessage(mes[i].date),isFavorite:isFavorite,myMessage:myMessage};
                arrayMes.push(aux);
            }
            res.render("respuestaMensajes",{layout:false,message:arrayMes});
        });
    });  
}

function searchAllMessagesPerfil(req,res){
    User.findById(req.body.id).exec(function(err,user){
        if (err) console.log(err);
        let arrayMes = new Array();
        
        Message.find({$or:[
            {idUser:{$in:user.friend}},
            {idUser:req.body.id}
        ]}).populate("idUser").sort({date:-1}).exec(function(err,mes){
            if (err) console.log(err);
            let aux = "";
            for (let i = 0; i < mes.length; i++) {
                let isFavorite = false;
                let myMessage = false;
                if(isSome(mes[i],user.favorites)){
                   isFavorite = true; 
                }
                if(mes[i].idUser._id.equals(req.session.user._id)){
                    myMessage = true; 
                }
                aux = {message:mes[i],dateCompare:formatDateMessage(mes[i].date),isFavorite:isFavorite,myMessage:myMessage};
                arrayMes.push(aux);
            }
            res.render("respuestaMensajes",{layout:false,message:arrayMes});
        });
    });  
}

function formatDateMessage(date){
    let dateFormat = "YYYY-MM-DD H:m:s";
    let day = date.getDate().length == 1 ? "0"+date.getDate() : date.getDate();
    let month = ""+(date.getMonth()+1).length == 1 ? "0"+date.getMonth()+1 : date.getMonth()+1;
    let hours = date.getHours().length == 1 ? "0"+date.getHours() : date.getHours();
    let min = date.getMinutes().length == 1 ? "0"+date.getMinutes() : date.getMinutes();
    let sec = date.getSeconds().length == 1 ? "0"+date.getSeconds() : date.getSeconds();
    let dateCompare = date.getFullYear()+"-"+month+"-"+day+" "+hours+":"+min+":"+sec;
    return moment(dateCompare,dateFormat).locale('es').fromNow();
}

function deleteMessage(req,res){
    Message.remove({_id:req.body.id},function(err,mes){
        if(err) console.log(err);
        res.send({ok:"ok"});
    })
    /*User.find({},function(err,a){
        if (err) console.log(err);
        for (let i = 0; i < a.favorites.length; i++) {
            console.log(a[i]._id);
            User.update({_id:a[i]._id},{$pull:{favorites:req.body.id}},function(err,user){
                console.log(user);
                if (err) console.log(err);
            }) 
        }
        
    })*/


   
}

function addFavorites(req,res){
    let aux = req.body.id.split(".");
    User.findByIdAndUpdate(req.session.user._id,{$push:{favorites:aux[0]}},function(err,user){
        if (err) console.log(err);
        let id = mongoose.Types.ObjectId(); 
        let newNotification = new Notification({
            _id: id,
            idUserOrigen: req.session.user._id,
            idUserDest: aux[1],
            idMessage: aux[0],
            read: false
        });
        newNotification.save(function(err){
            if (err) console.log(err);
            //User.findByIdAndUpdate(aux[1],{$push:{notification:id}},function(err,us){
                //if (err) console.log(err);
                socketApi.update("updateNotifications");
                res.send({ok:"ok"});
           // })
        })
  
    })  
}

function removeFavorites(req,res){
    let aux = req.body.id.split(".");
    User.findByIdAndUpdate(req.session.user._id,{$pull:{favorites:aux[0]}},function(err,user){
        if (err) console.log(err);
        res.send({ok:"ok"});
    }) 
}


function seeNotifications(req,res){
    Notification.find({idUserDest:req.session.user._id}).populate("idUserOrigen").sort({date:-1}).exec(function(err,not){
        if (err) console.log(err);
        let noRead = 0;
        for (let i = 0; i < not.length; i++) {
           if(!not[i].read){
               noRead++;
           }
        }
        res.render("respuestaNotificaciones",{layout:false,not:not,noRead:noRead});
    })
}

function readNotification(req,res){
    console.log(req.body.id)
    Notification.update({_id:req.body.id},{$set:{read:true}},function(err,not){
        console.log("entre");
        if (err) console.log(err);
        res.send({ok:"ok"});
    });
}

function deleteNotification(req,res){
    Notification.remove({_id:req.body.id},function(err,del){
        if (err) console.log(err);
        res.send({ok:"ok"});
    });
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
   searchAllMessages,
   addFavorites,
   removeFavorites,
   searchAllMessagesPerfil,
   seeNotifications,
   readNotification,
   deleteNotification,
   deleteMessage
   
};