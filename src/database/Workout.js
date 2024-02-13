const DB = require('./db.json')
const { saveToDatabase } = require('./utils')

const getAllWorkouts = () => {
  return DB.workouts
}

const getOneWorkout = (workoutID) => {
  const workout = DB.workouts.find((workout) => workout.id === workoutID)
  if (!workout) {
    return
  }
  return workout
}

const createNewWorkout = (newWorkout) => {
  const isAlreadyAdded =
    DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1
  console.log(isAlreadyAdded);
  if (isAlreadyAdded) {
    return
  }
  DB.workouts.push(newWorkout)
  saveToDatabase(DB)
  return newWorkout
}

const updateOneWorkout = (workoutID, changes) => {
  const indexForUpdate = DB.workouts.findIndex(
    (workout) => (
      workout.id === workoutID
    )
  )
  if (indexForUpdate === -1) {
    return
  }

  const updatedWorkout = {
    ...DB.workouts[indexForUpdate],
    ...changes,
    updatedAt: new Date().toLocaleDateString('en-US', { timeZone: "UTC" })
  }

  DB.workouts[indexForUpdate] = updatedWorkout

  saveToDatabase(DB)
  return updatedWorkout
}

const deleteOneWorkout = (workoutID) => {
  const indexForDelete = DB.workouts.findIndex(
    (workoud) => workoud.id === workoutID
  )
  if (indexForDelete === -1) {
    return
  }
  DB.workouts.splice(indexForDelete, 1)
  saveToDatabase(DB)
}


module.exports = { getAllWorkouts, createNewWorkout, getOneWorkout, updateOneWorkout, deleteOneWorkout }