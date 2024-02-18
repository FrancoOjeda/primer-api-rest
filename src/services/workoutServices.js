const Workout = require('../database/Workout.js')
const { v4: uuidv4 } = require('uuid')

const getAllWorkouts = (filterParams) => {
  const allWorkouts = Workout.getAllWorkouts(filterParams)
  return allWorkouts
}
const getOneWorkout = (workoutID) => {
  const workout = Workout.getOneWorkout(workoutID)
  return workout
}
const createNewWorkout = (newWorkout) => {
  const workoutToInsert = {
    ...newWorkout,
    id: uuidv4(),
    createAt: new Date().toLocaleDateString('en-US', { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleDateString('en-US', { timeZone: "UTC" })
  }

  const createdWorkout = Workout.createNewWorkout(workoutToInsert)
  return createdWorkout
}
const updateOneWorkout = (workoutID, changes) => {
  const updatedWorkout = Workout.updateOneWorkout(workoutID, changes)
  return updatedWorkout
}
const deleteOneWorkout = (workoutID) => {
  Workout.deleteOneWorkout(workoutID)
}


module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout
}