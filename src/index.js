const expres = require('express')
const path = require('path')
const apicache = require('apicache')
const v1WorkoutRouter = require('./v1/routes/workoutRoutes.js')
const { swaggerDocs: v1SwaggerDocs } = require('./v1/swagger')

const app = expres()
const PORT = process.env.PORT || 3000
const cache = apicache.middleware

app.use(expres.json())
app.use(cache('2 minutes'))
app.use(expres.urlencoded({ extended: false }))

app.use('/api/v1/workouts', v1WorkoutRouter)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`
  )
  v1SwaggerDocs(app, PORT)
})