const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const {detail,products,create,edit,update,destroy,add} = require('../controllers/productsController');
const prodValidator = require('../validations/prodValidator')
const storage = multer.diskStorage({
    destination: (req, file, callback) =>
    callback (null,'./public/images/zapas') , 
    filename: (req, file, callback) => 
    callback(null, 'img-zapa-' + Date.now() + path.extname(file.originalname))
});

const upload = multer({
    storage
})


router.get('/detail',detail);
router.get('/detail/:id',detail)

router.get('/all',products)

router.get('/create',add)
router.post('/create',upload.array('imagenes',2),prodValidator,create)

router.get('/edit/:id',edit)
router.put('/edit/:id',prodValidator,update)

router.delete('/delete/:id',destroy)
module.exports = router;