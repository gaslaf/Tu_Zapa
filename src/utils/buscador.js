const fs = require('fs');
const path = require('path');

let productos = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','zapatillas_db.json'),'utf-8'));

const buscador = (query) => {
    
const marcas = query
 {
        if (!Array.isArray(query)){
          return productos.filter(product => product.marca.toLowerCase().includes(marcas))
        }else{
          return productos.filter(product => marcas.some(marca => product.marca.toLowerCase().includes(marca.trim().toLowerCase())));        
      }

}
}
module.exports = buscador;
