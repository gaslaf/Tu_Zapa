cuotas = precio => {
    precioCuota = precio / 6;
    return Math.trunc(precioCuota)
}

module.exports = cuotas