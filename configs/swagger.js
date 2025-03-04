import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "Adoption System API",
            version:"1.0.0",
            description: "API para sistema de adopción de mascotas",
            contact:{
                name: "Adrian Morataya",
                email: "ssoto-2023147@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/superMarket/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
        "./src/category/*.js",
        "./src/product/*.js",
        "./src/user/*.js",
        "./src/cart/*.js",
        "./src/bill/*.js"
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export { swaggerDocs, swaggerUi }