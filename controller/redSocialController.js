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
//const fs = require('fs');
/*function getUser(req,res){
    Usuario.find((err,usuarios)=>{
        console.log(usuarios.length);
        if(err) throw err;
        res.render('index',{usuarios:usuarios});
      });
}*/
function initApp(req,res) {
    res.render("index",{message:""});

}

function login(req,res){
    let email = req.body.email;
    let passwd = req.body.passwd;
    User.find( {$and: [{email:email},{passwd:passwd}]} ,function(err,user){
       // console.log(err);
        if(err) 
           throw err;

        if (user.length > 0){
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
    //var form = new formidable.IncomingForm()
   // form.uploadDir = "./dir";
    //res.render("registro",{message:""});
   //s console.log(req.body.name);
    //console.log(req.body);
///console.log(req.body.image);
    //let name = req.body.name;
    //let passwd = req.body.passwd;
    //let image = req.files;
    //console.log(name);
    //console.log(passwd);
    //console.log(image);
   // console.log(req.body);
    //console.log(req.files.img);
    //console.log(req.files.img.name);
    //sres.render("prueba",{datos:req});
    //console.log(image2);
    /*var tmp_path = req.body.image.path;
    console.log(tmp_path);*/
   /* if (req.files){
        let file = req.files.img,
        img = file.name;
        let uploadpath ='../uploads/' + img;
        file.mv(uploadpath,function(err){
            if(err){
                console.log(err);
            }else{
                console.log("good");
            }
        })
    };*/
    


    //let encodedData = base64.encode(req.file);
    //console.log(encodedData);
   // let decodedData = base64.decode(encodedData);
   // console.log(decodedData);
    //let imageAsBase64 = fs.readFileSync(req.file, 'base64');
    //console.log(imageAsBase64);
    //console.log(req.file);
   //console.log(upload.single('img'));
  /* fs.readFile(req.file.path, function(err, data) {
        console.log(data);
        let encodedData = base64.encode(data);
        let decodedData = base64.decode(encodedData);
        res.render("prueba",{datos:decodedData});  
    });*/ 
    //let test = {name:req.body.name,passwd:req.body.passwd,photo:req.file}; 
    //User.insert(test);
    //res.render("prueba",{datos:req}); 


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
                interests: req.body.interests
            });
            insertUser.save(function(error) {
                    res.render("registro",{message:"Registrado Correctamente",interests:interests,country:country,status:"correcto"});
                 if (error) {
                      console.error(error);
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

function existInterest(value,array){
    for (let i = 0; i < array.length; i++) {
        if(array[i] == value){
            return true;
        }
    }
    return false;
}

function vistaUpdate (req, res){
    if (req.session.user === undefined){
        res.redirect("localhost:3000");
    }else{
        User.find( {email:req.session.user.email} ,function(err,user){
            if (err) throw err;
            if (user.length > 0 ){
               res.render("vistaUpdate",{user:user[0],message:""});
            }
        });  
    }
}

function updateName (req,res){
    console.log(req.body.name);
    User.update({email: req.session.user.email }, { $set: { name: req.body.name }}, function(err,user){
        if (err) {
            throw err;
            res.render("respuestaVistaUpdate",{message:"Problemas al intentar actualizar",status:"error"});
        }else{
            req.session.user.name = req.body.name;
            res.render("respuestaVistaUpdate",{message:"Actualizado Correctamennte",status:"correcto"});
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
                res.render("respuestaVistaUpdate",{message:"Problemas al intentar actualizar",status:"error"});
            }

            if (user.length >0 ){
                if (user[0].passwd == req.body.oldPasswd){
                    console.log(req.session.user.email);
                    User.update({email: req.session.user.email }, { $set: { passwd: req.body.newPasswd }}, function(err,user){

                        if (err) {
                            throw err;
                            res.render("respuestaVistaUpdate",{message:"Problemas al intentar actualizar",status:"error"});
                        }else{
                            console.log(user);
                            req.session.user.passwd = req.body.newPasswd;
                            res.render("respuestaVistaUpdate",{message:"Actualizado Correctamennte",status:"correcto"});
                        }
                    });
                }else{
                    res.render("respuestaVistaUpdate",{message:"la contraseña introducida no es correcta",status:"error"});
                }      
            }
        });  
    }
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
   updateName
};