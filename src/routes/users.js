var express = require('express');
var router = express.Router();
const regValidator = require('../validations/RegValidator')
const {login,register,processRegister} = require('../controllers/usersController')
/* GET users listing. */
router.get('/login',login)
router.get('/register',register)
router.post('/register',regValidator,processRegister)
module.exports = router;
