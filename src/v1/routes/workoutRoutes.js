const express = require('express')
const router = express.Router()

const workoutController = require('../../controllers/workoutController.js')


router
  .get('/', workoutController.getAllWorkouts)
  .get('/:workoutID', workoutController.getOneWorkout)
  .post('/', workoutController.createNewWorkout)
  .patch('/:workoutID', workoutController.updateOneWorkout)
  .delete('/:workoutID', workoutController.deleteOneWorkout)

module.exports = router
