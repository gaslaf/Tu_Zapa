const {check, body} = require('express-validator')


module.exports = [
    check('nombre')
    .notEmpty().withMessage('*Debe indicar un nombre.'),

    check('apellido')
    .notEmpty().withMessage('*Debe indicar un apellido.'),

    check('email')
    .notEmpty().withMessage('*Debe indicar un mail.').bail()
    .isEmail().withMessage('*El email es invalido'),

    check('remail')
    .notEmpty().withMessage('*Debe repetir su contraseña')
    .custom(( value, {req}) => {
        if(value != req.body.email){
            return false
        }else{
            return true
        }
    }).withMessage('*El correo no coindice'),

    check('pass')
    .notEmpty().withMessage('*Debe indicar una contraseña').bail()
    .isLength({min: 6}).withMessage('Minimo 6 caracteres').bail()
    .isLength({max : 10}).withMessage('Máximo 10 caracteres'),

    check('passtwo')
    .notEmpty().withMessage('*Debe repetir su contraseña')
    .custom(( value, {req}) => {
        if(value != req.body.pass){
            return false
        }else{
            return true
        }
    }).withMessage('*Las contraseñas no coinciden')
]