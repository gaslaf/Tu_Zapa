const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser')
const descuento = require('../utils/descuento');
const cuotas = require('../utils/cuotas');
const aleatorios = require('../utils/aleatorios');
const porMarca = require('../utils/porMarca');


let productos = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','zapatillas_db.json'),'utf-8'));
const colores = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','colores_db.json'),'utf-8'));

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
        })},
    products: (req,res) =>{

        let acumulador = []
        for (let index = 0; index < (req.query.marca).length; index++) {
            let resultado = productos.filter(producto => producto.marca.toLowerCase().includes(req.query.marca[index]))
            acumulador = acumulador.concat(resultado)
        }
       // &&producto.genero.toLowerCase().includes(busca.genero[index])&&producto.precio <= (+busca.precio)&&producto.descuento <=(+busca.descuento)&&producto.ajuste.toLowerCase() == (busca.ajuste)&& producto.color.toLowerCase() == (busca.color)&&producto.talle == (+busca.talle)
        //let resultado = productos.filter( producto => producto.marca.toLowerCase() == marcas)
       // filtrados = productos.filter(producto => producto.marca.toLowerCase() === marcas)
        return res.render('products',{
            title : 'Resultados de la busqueda',
            productos,
            descuento,
            cuotas,
            porMarca,
            acumulador
        })
    },
    create : (req,res) => {
        const {marca,nombre,precio,talle,ajuste,origen,color,genero} = req.body;
        //return res.send(req.body)
        let producto = {
            id : productos[productos.length -1].id +1,
            marca : marca,
            nombre : nombre,
            precio : +precio,
            talle : (talle.split),
            color : color,
            genero : genero,
            ajuste : ajuste,
            origen : origen,
            imagenUno : req.files ? req.files[0].filename : 'default-image.png',
            imagenDos : req.files ? req.files[1].filename : 'default-image.png'
        }
        productos.push(producto)
        
        fs.writeFileSync(path.join(__dirname,'..','data','zapatillas_db.json'),JSON.stringify(productos,null,2),'utf-8')
        productos = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','zapatillas_db.json')),'utf-8')
        return res.render('productAdd',{
            title : 'Crear un producto.',
            productos,
            colores
        })},
    edit : (req,res) => {

        let producto = productos.find(producto =>  producto.id === +req.params.id )

            return res.render('productEdit',{
                title : 'Editar producto',
                producto,
                colores})
        

    },
    update : (req,res) => { 
        const {marca,nombre,precio,talle,ajuste,origen,color,genero} = req.body;
       productos.forEach(producto => {
            if(producto.id == +req.params.id){
                producto.marca = marca,
                producto.nombre = nombre,
                producto.precio = +precio,
                producto.color = color,
                producto.talle = talle.split(','),
                producto.ajuste = ajuste,
                producto.origen = origen,
                producto.genero = genero
            
            productos.push(req.body)
            fs.writeFileSync(path.join(__dirname,'..','data','zapatillas_db.json'),JSON.stringify(productos,null,2),'utf-8')
            productos = JSON.parse(fs.readFileSync(path.join(__dirname,'..','data','zapatillas_db.json')),'utf-8')
            return res.redirect('/')
           } })
        
    }
    
    
}