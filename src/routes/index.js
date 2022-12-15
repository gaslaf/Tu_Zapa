var express = require('express');
var router = express.Router();
const adminUserCheck = require('../middlewares/adminUserCheck');
const {index,search,admin} = require('../controllers/mainController');

/* GET home page. */
router.get('/',index);
router.get('/admin',adminUserCheck,admin)
router.get('/search',search)
module.exports = router;
