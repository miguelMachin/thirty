/*let mongoose = require('./../config/conexion');
let User = require('./../models/users');*/
const mongoose = require('./../config/conexion');
const User = require('./../models/users');
const base64 = require('base-64');
//const multer = require('multer');
const fs = require('fs');
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
                name: req.body.name,
                passwd: req.body.passwd,
                email: req.body.email,
                country:req.body.country,
                city:req.body.city,
                mood:"Sin Estado",
                favorites: [],
                friends: [],
                interests: req.body.interests,
                ext:""
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
    if (req.session.user === undefined){
        res.redirect("localhost:3000");
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
    if (req.session.user === undefined){
        res.redirect("localhost:3000");
    }else{
        res.render("vistaUpdate",{user:req.session.user,message:""});     
    }
}

function updateName (req,res){
    console.log(req.body.name);
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
    console.log(req.body.mood);
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
                    console.log(req.session.user.email);
                    User.update({email: req.session.user.email }, { $set: { passwd: req.body.newPasswd }}, function(err,user){

                        if (err) {
                            throw err;
                            res.render("respuestaVistaUpdate",{layout : false,message:"Problemas al intentar actualizar",status:"error"});
                        }else{
                            console.log(user);
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
    user.ext = user._id+"."+ext[1];
    fs.rename(req.file.path,"public/images/"+user._id+"."+ext[1]);
    User.update({email: user.email }, { $set: { ext: user._id+"."+ext[1] }}, function(err,user){
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
    let img = req.session.user.ext;
    console.log("img: "+img);
    res.render("respuestaVistaAvatar",{layout:false,img:img});
}

function vistaBuscar(req,res){
    res.render("vistaBuscar");
}

function searchAll(req,res){
    User.find({_id:{$ne:req.session.user._id}},function(err,user){
        if (err)
            console.log(err);
        res.render("respuestaBuscar",{layout:false,users:user});

    });  
}

function searchPerson(req,res){
    console.log(req.params.tagId);
    User.findById(req.params.tagId,function(err,user){
        if (err)
            console.log(err);
        res.render("vistaPersona",{user:user});

    });  
}

module.exports = {
   // getUser
   initApp,
   login,
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
   searchPerson
};