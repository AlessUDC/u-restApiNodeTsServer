import request from 'supertest'
import server from '../../server'
describe('POST /api/products', () => {
    test('should display validation errors' , async () => {
        const response = await request(server).post('/api/products').send({/* Empty... D:*/})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    test('should validate that the price is a number and greater than 0' , async () => {
        const response = await request(server).post('/api/products').send({
            name: "Monitor Curvo",
            price: "Hola"
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)
        
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(3)
    })
 
    test('should create a new product' , async () => {
        const response = await request(server).post('/api/products').send(
            {
                name: "Memoria RAM 8GB 3200Mhz --TESTING",
                price: 175
            }
        )

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')
        
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products', () => {
    test('should check if api/products URL exists' , async () => {
        const response = await request(server).get('/api/products')
        expect(response.status).not.toBe(400)
    })

    test('GET a JSON response with products', async () => {
        const response = await request(server).get('/api/products')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)    // Nos aseguramos de que el response sea un JSOn
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('errors')
    })
})

// Mio
// describe('GET api/products/:id',  () => {
//     test('should check if api/products/:id URL exists', async () => {
//         const response = await request(server).get('/api/products/1')
//         expect(response.status).toBe(200)
//         expect(response.body).toHaveProperty('data')
//         expect(response.body.data).toHaveLength(1)
        
//         expect(response.status).not.toBe(400)
//         expect(response.body.data).not.toHaveLength(2)
//     })

//     test('should check if api/products/:id URL not exists', async () => {
//         const response = await request(server).get('/api/products/999')
//         expect(response.status).toBe(404)
//         expect(response.body).toHaveProperty('error')
//         expect(response.body.data).toHaveLength(1)
//     })
//     test('should return 400 if id is not number', async () => {
//         const response = await request(server).get('/api/products/hola')
//         expect(response.status).toBe(400)
//         expect(response.body).toHaveProperty('errors')
//         expect(response.body.data).toHaveLength(1)
//     })
// })

// Del profe
describe('GET api/products/:id' , () => {
    test('should return a 404 response for a non-existent product', async () => {
        const productId = 9999
        const response = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
    })

    test('should check a valid ID in the URL', async () => {
        const response = await request(server).get('/api/products/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    test('get a JSON response for a single product', async () => {
        const response = await request(server).get('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

describe('PUT /api/products:id' , () => {
    test('should check a valid ID in the URL', async () => {
        const response = await request(server)
            .put('/api/products/not-valid-url')
            .send({
                name : "Monitor HP --TEST-PUT 2nd test()",
                price: 900,
                availability: true   
            })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    test('should display validation error messages when updating a product', async() => {
        const response = await request(server).put('/api/products/1').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    test('should validate that the price is greater than 0', async() => {
        const response = await request(server)
            .put('/api/products/1')
            .send({                
                name : "Monitor HP --TEST-PUT 3rd test()",
                price: 0,
                availability: true                
            })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Precio no válido')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    test('should return a 404 response for a non-existent product', async() => {
        const productId = 9999
        const response = await request(server)
            .put(`/api/products/${productId}`)
            .send({                
                name : "Monitor HP --TEST-PUT 4th test()",
                price: 3000,
                availability: true                
            })

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto No Encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    test('should update an existing product with valid data', async() => {
        const response = await request(server)
            .put(`/api/products/1`)
            .send({                
                name : "Monitor HP --TEST-PUT 5th test()",
                price: 500,
                availability: true                
            })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('DELETE /api/products/:id' , () => {
    test('should check a valid ID', async() => {
        const response = await request(server).delete('/api/products/not-valid-id')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no válido')
    })

    test('should return a 404 response for a non-existent product', async() => {
        const productId = 9999
        const response = await request(server).delete(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.status).not.toBe(200)
    })

    test('should delete a product', async () => {
        const response = await request(server).delete('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toBe('Producto Eliminado')
        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
    })
})