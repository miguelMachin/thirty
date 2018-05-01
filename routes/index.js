const express = require('express');
const app = require('../app');
const router = express.Router();
const redSocial = require('./../controller/redSocialController');
/*const multer = require('multer');
const upload = multer({dest: 'uploads/'});*/

/* GET home page. */
router.get('/', redSocial.initApp);
router.post('/principal', redSocial.login);
router.get('/vistaPrincipal', redSocial.vistaPrincipal);
router.get('/vistaRegistro', redSocial.vistaRegistro);
router.get('/vistaBuscar', redSocial.vistaBuscar);
router.post('/registrar', redSocial.registrar);
router.get('/vistaUpdate', redSocial.vistaUpdate);
router.post('/updateName', redSocial.updateName);
router.post('/updateMood', redSocial.updateMood);
router.post('/updatePasswd', redSocial.updatePasswd);
router.post('/updateAvatar', redSocial.updateAvatar);
router.post('/changeAvatar', redSocial.changeAvatar);
router.post('/searchAll', redSocial.searchAll);
router.post('/searchPerson', redSocial.searchPerson);
router.post('/addFriendPeding', redSocial.addFriendPeding);
router.post('/removeFriendPeding', redSocial.removeFriendPeding);
router.post('/removeFriend', redSocial.removeFriend);
router.post('/perfilPerson', redSocial.perfilPerson);
router.post('/addFriend', redSocial.addFriend);
router.get('/logout', redSocial.logout);
router.post('/seeRequests', redSocial.seeRequests);
router.post('/addMessage', redSocial.addMessage);
router.post('/searchAllMessages', redSocial.searchAllMessages);
router.post('/addFavorites', redSocial.addFavorites);
router.post('/removeFavorites', redSocial.removeFavorites);
module.exports =  router; 
