module.exports = {
  renderImage(image) {
    return {
      id: image.id,
      id_usuario: image.id_usuario,
      url: `http://${process.env.IP}:3333/uploads/${image.url}`
    }
  }
}