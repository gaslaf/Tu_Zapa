const fs = require('fs');
const path = require('path')
const productos = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','zapatillas_db.json'),'utf-8'));
const productosFiltrados = productos.filter(producto => producto.id <= 8)
module.exports = {
    index : (req,res) => {
        return res.render('index',{
            title : 'TU ZAPA - Store',
            productos,
            productosFiltrados
        })}
    }
