const {body} = require('express-validator');
const path = require('path');
const fs = require('fs');
const usuarios = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','usuarios_db.json'),'utf-8'));
const bcrypt = require('bcryptjs');

module.exports = [
    body('email')
    .custom((value,{req}) =>{
        let usuario = usuarios.find(usuario => usuario.email === value && bcrypt.compareSync(req.body.pass,usuario.pass))
        if(usuario){
            return true
        }else{
            return false
        }
    }).withMessage('No podes ingresar email o contraseña incorrectas.')
]