const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
let productos = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','zapatillas_db.json'),'utf-8'));

const {validationResult} = require('express-validator')
const usuarios = require('../data/usuarios_db.json');

module.exports = {
    login : (req,res) =>{
        return res.render('login',{
            title : 'Iniciar Sesión'
        })},
    processLogin: (req,res) =>{
        let errors = validationResult(req);
        if(errors.isEmpty()){
            const {email} = req.body;

            let usuario = usuarios.find(usuario => usuario.email === email);
            req.session.userLogin = {
                id: usuario.id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                rol: usuario.rol
            }
            return res.redirect('/')
        }else{
            return res.render('login',{
                title: 'Iniciar sesión',
                productos,
                errors: errors.mapped()
            })
        }
    },
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
                pass: bcrypt.hashSync(pass,10),
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
    },
    profile: (req,res) => {
        return res.render('profile',{
            title: 'Tu perfil'
        })
    },
    logout: (req,res) =>{
        req.session.destroy();
        return res.redirect('/')
    }
}