import express from 'express'
import cors from 'cors'
import { generateFromOllama } from './ollamaService.js'
import db from './db.js'

const app = express()
const PORT = 3001

// Middleware para CORS y JSON
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body

  try {
    // 1. Obtiene la respuesta de Ollama, que aún puede contener el <think>
    const rawResponse = await generateFromOllama(prompt)

    // 2. Lógica para filtrar el texto de "pensamiento"
    let cleanResponse = rawResponse
    const thinkStartTag = '<think>'
    const thinkEndTag = '</think>'

    const startIndex = rawResponse.indexOf(thinkStartTag)
    const endIndex = rawResponse.indexOf(thinkEndTag)

    if (startIndex !== -1 && endIndex !== -1) {
      // Si se encuentran las etiquetas, corta la parte de la respuesta que contiene el "think"
      cleanResponse = rawResponse.substring(endIndex + thinkEndTag.length).trim()
    }
    
    // 3. Envía la respuesta filtrada al cliente
    res.json({ response: cleanResponse })
    
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error procesando la solicitud' })
  }
})

// GET: obtener mensajes
app.get('/api/messages', async (req, res) => {
  await db.read()
  res.json(db.data.messages)
})

// POST: Ruta para agregar nuevo mensaje
app.post('/api/messages', async (req, res) => {
  // text, sender
  const { text, sender } = req.body
  if (!text || !sender) {
    return res.status(400).json({ error: 'Faltan campos en el objeto' })
  }

  const newMessage = {
    id: Date.now(),
    text,
    sender,
    timestamp: new Date().toISOString()
  }

  await db.read()
  db.data.messages.push(newMessage)
  await db.write()

  res.status(201).json(newMessage)
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`)
})
