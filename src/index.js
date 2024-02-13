const expres = require('express')
const path = require('path')
const v1WorkoutRouter = require('./v1/routes/workoutRoutes.js')

const app = expres()
const PORT = process.env.PORT || 3000

app.use(expres.json())
app.use(expres.urlencoded({ extended: false }))

app.use('/api/v1/workouts', v1WorkoutRouter)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))