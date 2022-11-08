sacarDescuento = (precio,porcentaje) =>{
    let descuento = (precio * porcentaje) / 100;
    return precio - descuento
}

module.exports = sacarDescuento;