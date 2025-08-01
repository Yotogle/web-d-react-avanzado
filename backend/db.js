import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { join } from 'path'
import { fileURLToPath } from 'url'

// Rutas
const __filename = fileURLToPath(import.meta.url)
const __dirvname = join(__filename, '..')

const file = join(__dirvname, 'db.json')
const adapter = new JSONFile(file)
const defaultData = { messages: [] }

const db = new Low(adapter, defaultData)

await db.read()

await db.write()
/* console.log('ruta:', __filename)
console.log('Ruta:', import.meta.url) */

export default db
