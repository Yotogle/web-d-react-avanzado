// 1 importamos modulo express
const express = require('express')
// 2 creamos una aplicacion express
const app = express()
// 3 definimos el puerto que va a escuchar el servidor
const PORT = 8080

app.get('/', (req, res) => {
  res.send('Hola mundo')
})
// 4
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
