const {check} = require('express-validator');

module.exports = [
    check('marca')
    .notEmpty().withMessage('*Debe indicar una marca para el producto.'),

    check('nombre')
    .notEmpty().withMessage('*Debe indicar un nombre para el producto.'),

    check('precio')
    .notEmpty().withMessage('*Debe indicar un precio para el producto.').bail()
    .isInt().withMessage('*Debe indicar un número'),

    check('talle')
    .notEmpty().withMessage('*Debe indicar un número.'),

    check('descuento')
    .notEmpty().withMessage('*Debe indicar un descuento.'),

    check('color')
    .notEmpty().withMessage('*Debe indicar un color'),

    check('genero')
    .notEmpty().withMessage('*Debe indicar un genero'),

    check('ajuste')
    .notEmpty().withMessage('*Debe indicar un ajuste'),

    check('origen')
    .notEmpty().withMessage('*Debe indicar un talle'),

    check('descripcion')
    .notEmpty().withMessage('*Debe indicar una descripción')



]
