const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

// Metadata info About out API

const options = {
  definition: {
    openapi: '3.0.0',
    info: { title: 'Workout API', version: '1.0.0' },

  },
  apis: ['src/v1/routes/workoutRoutes.js', "src/v1/controllers/workoutController.js"]
}

// Docs en JSON format

const swaggerSpect = swaggerJSDoc(options)

// Function to setup our docs

const swaggerDocs = (app, port) => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpect)),
    app.use('/api/v1/docs.json', (req, res) => {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerSpect)
    })
  console.log(`version 1.0.0 docs available at http://localhost:${port}/api/v1/docs`);
}

module.exports = { swaggerDocs }