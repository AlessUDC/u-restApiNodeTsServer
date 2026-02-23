import request from 'supertest'
import server from '../server'

describe('GET /api', () => {
    // 'Debería enviar una respuesta json'
    test('should send back a json response', async () => {
        const res = await request(server).get('/api')

        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/json/)

        
    })
}) 