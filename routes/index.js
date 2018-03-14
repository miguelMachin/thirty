const express = require('express');
const router = express.Router();

const redSocial = require('./../controller/redSocialController');

/* GET home page. */
router.get('/', redSocial.initApp);
router.post('/login', redSocial.login);
module.exports = router;
