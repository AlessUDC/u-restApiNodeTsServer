import request from 'supertest'
import server, {connectDB} from '../server'
import db from '../config/db'

describe('GET /api', () => {
    // 'Debería enviar una respuesta json'
    test('should send back a json response', async () => {
        const res = await request(server).get('/api')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)
    })
})

jest.mock('../config/db')

describe('connectDB' , () => {
    test('should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValue(new Error('Hubo un error al conectar a la BD'))
        const consoleSpy = jest.spyOn(console, 'log')

        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar a la BD')
        )
    })
})