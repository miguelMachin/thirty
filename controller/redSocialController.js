const mongoose = require('./../config/conexion');
const Usuario = require('./../models/usuarios');

/*function getUser(req,res){
    Usuario.find((err,usuarios)=>{
        console.log(usuarios.length);
        if(err) throw err;
        res.render('index',{usuarios:usuarios});
      });
}*/
function initApp(req,res) {
    res.render("index",{mensaje:""});

}
function login(req,res){
    let name = req.body.name;
    let passwd = req.body.passwd;
    Usuario.find( {$and: [{nombre:name},{passwd:passwd}]},function(err,usuario){
        console.log(usuario.length);
        if(err) 
           throw err;

        if (usuario.length > 0){
            usuario = usuario[0]
           res.render('principal',{usuario:usuario});
        // console.log(usuario.nombre); 
        }else{
            res.render("index",{mensaje:"USUARIO O CONTRASEÑA ERRONEO"});
        }
        
        
       // res.render('principal',{usuario:usuario});
       // console.log(usuario[0].nombre);
    });

}

module.exports = {
   // getUser
   initApp,
   login
};