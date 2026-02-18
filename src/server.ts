import express from  'express'
import router from './routes'
import db from './config/db'
import colors from 'colors'

// Conectar a la base de datos
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.magenta('Conexión exitosa a la BD'))
    } catch (error) {
        // console.log(error)
        console.log( colors.red.bold('Hubo un error al conectar a la BD'))
    }
}
connectDB()


// Instancia de axios
const server = express()

// Leer los datos de formularios
server.use(express.json())

server.use('/api/products', router)


export default server