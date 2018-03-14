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
    res.render("index");

}
function login(req,res){
    let name = req.body.name;
    let passwd = req.body.passwd;
    console.log(name);
    Usuario.find({nombre:name},{passwd:passwd},function(err,usuario){
        if(err) throw err;
        res.send(usuario.nombre);
        console.log(usuario);
    });

}

module.exports = {
   // getUser
   initApp,
   login
};