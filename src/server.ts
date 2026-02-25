import express from  'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, {swaggerUiOptions} from './config/swagger'

// Conectar a la base de datos
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // Para hacer los test, se comentan los console.log
        // console.log(colors.magenta('Conexión exitosa a la BD'))
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

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server