const fs = require('fs');
const path = require('path');
const productos = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','zapatillas_db.json'),'utf-8'));

nuevoArray = marca =>  productos.filter(producto => producto.marca === marca )

module.exports = nuevoArray