require('dotenv').config()
console.log(process.env.PORT)
console.log(process.env.NOMBRE)

// 1 importamos modulo express
const express = require('express')
const { infoPeliculas } = require('./peliculas')
// 2 creamos una aplicacion express
const app = express()
// 3 definimos el puerto que va a escuchar el servidor
const PORT = 8080

app.get('/', (req, res) => {
  res.send('Bienvenido a nuestra plataforma de peliculas')
})
app.get('/api/peliculas', (req, res) => {
  res.send(infoPeliculas)
})
app.get('/api/peliculas/accion', (req, res) => {
  res.send(infoPeliculas.accion)
})
app.get('/api/peliculas/comedia', (req, res) => {
  res.send(infoPeliculas.comedia)
})
app.get('/api/peliculas/drama', (req, res) => {
  res.send(infoPeliculas.drama)
})
app.get('/api/peliculas/cienciaFiccion', (req, res) => {
  res.send(infoPeliculas.cienciaFiccion)
})

app.get('/api/peliculas/:titulo', (req, res) => {
  const tituloBuscado = req.params.titulo
  const todoslosGeneros = Object.values(infoPeliculas)
  const todasLasPeliculas = todoslosGeneros.flat()
  const resultados = todasLasPeliculas.filter(pelicula => pelicula.titulo.toLowerCase() === tituloBuscado.toLowerCase())
  if (resultados.length > 0) {
    res.send(resultados)
  } else {
    res.status(404).send({ mensaje: `No se encontraron peliculas con el nombre de ${tituloBuscado}` })
  }
})

app.get('/api/peliculas/accion/:titulo', (req, res) => {
  const titulo = req.params.titulo
  const resultados = infoPeliculas.accion.filter(pelicula => pelicula.titulo === titulo)

  if (resultados.length === 0) {
    return res.status(400).send(`No se encontraron resultados para ${titulo}`)
  }
  res.send(resultados)
})

app.get('/api/peliculas/year/:year', (req, res) => {
  const getAllMovies = () => {
    const todoslosGeneros = Object.values(infoPeliculas)
    return todoslosGeneros.flat()
  }
  const añoBuscado = req.params.year
  const añoNumerico = Number(añoBuscado)
  const todasLasPeliculas = getAllMovies()
  const resultados = todasLasPeliculas.filter(pelicula => pelicula.year === añoNumerico)
  if (resultados.length === 0) {
    return res.status(400).send(`No se encontraron peliculas del año ${añoBuscado}`)
  }
  res.send(resultados)
})
app.get('/api/peliculas/accion/titulo/:titulo/:year', (req, res) => {
  /* const titulo = req.params.titulo
  const year = req.params.year */
  const { titulo, year } = req.params
  const resultados = infoPeliculas.accion.filter(pelicula => pelicula.titulo === titulo && pelicula.year === Number(year))

  if (resultados.length === 0) {
    return res.status(400).send(`No se encontraron resultados para ${titulo} en el año ${year}`)
  }

  res.send(resultados)
})

app.get('/api/peliculas/comedia/:pais', (req, res) => {
  const pais = req.params.pais
  const resultados = infoPeliculas.comedia.filter(pelicula => pelicula.pais === pais)

  if (req.query.ordenar === 'year') {
    return res.send(resultados.sort((a, b) => b.year - a.year))
  }

  res.send(resultados)
})

// Metodo para subir informaccion al backend
app.use(express.json())
app.post('/api/peliculas', (req, res) => {
  const nuevaPelicula = req.body

  console.log(nuevaPelicula)
  res.status(201).send({
    mensaje: 'La película se recibió con éxito',
    datos: nuevaPelicula
  })
})
// 4
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
