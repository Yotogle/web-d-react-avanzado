// 1. Importar express
// 1ra forma CommonJS
/* const express = require('express')
require('dotenv').config() */
// 2da forma ESmodules
import express from 'express'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()
// 2. Crear la aplicacion de express

const app = express()
const PORT = process.env.PORT

// funcion que lee la info de db.json
const readData = () => {
  try {
    const data = fs.readFileSync('./src/db.json')
    return JSON.parse(data)
  } catch (error) {
    console.error(error)
  }
}
console.log(readData())

// funcion que escribe dentro de db.json
const writeData = (data) => {
  try {
    fs.writeFileSync('./src/db.json', JSON.stringify(data))
  } catch (error) {
    console.error(error)
  }
  // return JSON.stringify(data)
}

app.get('/', (req, res) => {
  res.send('Hola desde el back')
})

app.get('/peliculas', (req, res) => {
  const data = readData()
  res.json(data)
})
app.get('/peliculas/:id', (req, res) => {
  const id = Number(req.params.id)
  const result = readData().accion.find(pelicula => pelicula.id === id)
  res.json(result)
})

// enviar  info
app.use(express.json())
app.post('/peliculas', (req, res) => {
  const data = readData()
  const body = req.body
  const newMovie = {
    id: data.accion.length + 1,
    ...body
  }
  data.accion.push(newMovie)
  writeData(data)
  res.json(newMovie)
})
// tercer metodo PUT
app.put('/peliculas/:id', (req, res) => {
  const data = readData()
  const id = parseInt(req.params.id)
  const body = req.body

  const peliculaIndex = data.accion.findIndex(movie => movie.id === id)
  data.accion[peliculaIndex] = {
    ...data.accion[peliculaIndex],
    ...body
  }
  writeData(data)
  res.json({ message: 'Pelicula actualizada correctamente' })
})

// cuerto metodo

app.delete('/peliculas/:id', (req, res) => {
  const data = readData()
  const id = Number(req.params.id)
  const peliculaIndex = data.accion.findIndex(movie => movie.id === id)
  data.accion.splice(peliculaIndex, 1)
  writeData(data)
  res.json({ message: 'Pelicula eliminada correctamente' })
})
// ###
app.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto', PORT)
})
