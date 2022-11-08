const fs = require('fs');
const path = require('path');
const descuento = require('../utils/descuento');
const cuotas = require('../utils/cuotas');
const aleatorios = require('../utils/aleatorios');
const porMarca = require('../utils/porMarca')

const productos = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','zapatillas_db.json'),'utf-8'));



module.exports = {
    detail: (req,res) => {
        
        //return res.send(aleatorios(adidas,4))
        let producto = productos.find( producto => producto.id == +req.params.id)
        return res.render('detail',{
            productos,
            producto,
            descuento,
            cuotas,
            aleatorios,
            porMarca
        })
    }
}