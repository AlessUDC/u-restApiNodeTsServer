import swaggerJSDoc from 'swagger-jsdoc'
import { SwaggerUiOptions } from 'swagger-ui-express'

const options : swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.2',
        tags: [
            {
                name: 'Products',
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: '1.0.0',
            description: 'API Docs for Products'
        }
    },
    apis: ['./src/router.ts']
}

const swaggerSpec = swaggerJSDoc(options)

// Cambiar logotipo de 'Swagger'
const swaggerUiOptions : SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link {
            content: url("data:image/svg+xml;utf8,\
                <svg xmlns='http://www.w3.org/2000/svg' width='400' height='100' viewBox='0 0 400 100'>\
                    <defs>\
                        <linearGradient id='netGrad' x1='0%' y1='0%' x2='100%' y2='100%'>\
                            <stop offset='0%' stop-color='%2368A063'/>\
                            <stop offset='100%' stop-color='%233178C6'/>\
                        </linearGradient>\
                    </defs>\
                    \
                    <path d='M25 50 L40 24 L70 24 L85 50 L70 76 L40 76 Z' fill='none' stroke='url(%23netGrad)' stroke-width='5' stroke-linejoin='round'/>\
                    \
                    <text x='55' y='52' font-family='Segoe UI, Montserrat, sans-serif' font-size='20' font-weight='800' fill='%23ffffff' text-anchor='middle' dominant-baseline='middle'>e<tspan fill='%233178C6'>TS</tspan></text>\
                    \
                    <text x='100' y='52' font-family='Segoe UI, Montserrat, sans-serif' font-size='26' font-weight='700' fill='%23ffffff' dominant-baseline='middle'>API<tspan font-weight='400' fill='%23a0a0a0'> alessDev - Docs</tspan></text>\
                </svg>"
            );
            height: 80px;
            width: auto;
        }
        .swagger-ui .topbar {
            background-color: #181818;
        }
    `,
    customSiteTitle: 'Documentación REST API Express / TypeScript'
}

export default swaggerSpec

export {
    swaggerUiOptions
}