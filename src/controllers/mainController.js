const fs = require('fs');
const path = require('path')
const productos = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','zapatillas_db.json'),'utf-8'));
const productosFiltrados = productos.filter(producto => producto.id <= 8)
const aleatorios = require('../utils/aleatorios');
const porMarca = require('../utils/porMarca');
const porDescuento = require('../utils/porDescuento')
let mayor = productos.filter(producto => producto.descuento >= 50)
module.exports = {
    index : (req,res) => {
        return res.render('index',{
            title : 'TU ZAPA - Store',
            productos,
            productosFiltrados,
            aleatorios,
            porMarca,
            porDescuento,
            mayor
        })},
    search : (req,res) => {
        if (req.query.busqueda) {
            let resultado = productos.filter(producto => producto.marca.toLowerCase() === req.query.busqueda.toLowerCase())
            return res.render('search',{
                resultado,
                busqueda : req.query.busqueda
            })
        }
        }
    }
    
