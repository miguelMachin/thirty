const express = require('express');
const router = express.Router();

const redSocial = require('./../controller/redSocialController');
/*const multer = require('multer');
const upload = multer({dest: 'uploads/'});*/

/* GET home page. */
router.get('/', redSocial.initApp);
router.post('/principal', redSocial.login);
router.get('/vistaPrincipal', redSocial.vistaPrincipal);
router.get('/vistaRegistro', redSocial.vistaRegistro);
router.post('/registrar', redSocial.registrar);
router.get('/vistaUpdate', redSocial.vistaUpdate);
router.post('/updateName', redSocial.updateName);
router.post('/updateMood', redSocial.updateMood);
router.post('/updatePasswd', redSocial.updatePasswd);
router.post('/updateAvatar', redSocial.updateAvatar);

module.exports = router;
