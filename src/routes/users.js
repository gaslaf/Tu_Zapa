var express = require('express');
var router = express.Router();
const regValidator = require('../validations/RegValidator');
const {login,register,processRegister,processLogin,profile,logout} = require('../controllers/usersController');
const userValidator = require('../validations/userValidator');
/* GET users listing. */
router.get('/login',login);
router.post('/login',userValidator,processLogin);

router.get('/register',register);
router.post('/register',regValidator,processRegister);
router.get('/profile',profile);
router.get('/logout',logout);
module.exports = router;
