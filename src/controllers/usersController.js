const fs = require('fs');
const path = require('path')

const {validationResult} = require('express-validator')
const usuarios = require('../data/usuarios_db.json')

module.exports = {
    login : (req,res) =>{
        return res.render('login',{
            title : 'Iniciar Sesión'
        })},
    register : (req,res) =>{
        return res.render('register',{
            title : 'Crea Tu Cuenta'
        })
    },
    processRegister: (req,res) => {
       let errors = validationResult(req);
      // return res.send(errors.mapped())
        if(errors.isEmpty()){
            const {nombre,apellido,email,pass} = req.body
            let usuario = {
                id : usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
                nombre: nombre.trim(),
                apellido: apellido.trim(),
                email: email,
                pass: pass.trim(),
                rol: 'user'
            }
            usuarios.push(usuario)
            fs.writeFileSync(path.join(__dirname,'..','data','usuarios_db.json'),JSON.stringify(usuarios,null,2),'utf-8')

            res.redirect('/users/login')
        }else{
            res.render('register',{
                title: 'Crea Tu Cuenta',
                old: req.body,
                errors: errors.mapped()
            })
        }
    }
}