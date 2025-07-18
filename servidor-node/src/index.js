// 1 llamar el modulo
const http = require('http')

// 2 crear el server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/plain' })
  res.end('Hola mundo desde Node.js')
})

// 3 escuchamos el server
const PORT = 3000
server.listen(PORT, () => {
  console.log('servidor ejecutandose en el port  http://localhost:3000')
})
