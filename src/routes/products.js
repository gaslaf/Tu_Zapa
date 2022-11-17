const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const {detail,products,create,edit,update,destroy} = require('../controllers/productsController');

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
router.get('/create',create)
router.post('/create',upload.array('imagenes',2),create)

router.get('/edit/:id',edit)
router.put('/edit/:id',update)

router.delete('/delete/:id',destroy)
module.exports = router;