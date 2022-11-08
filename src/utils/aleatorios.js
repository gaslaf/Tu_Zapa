const tresAleatorios = (producto,cantidad) => {
    return [...producto].sort(() => (Math.random() > 0.5 ? 1 : -1)).slice(0, cantidad)
  }

  module.exports = tresAleatorios