const DB = require('./db.json')
const { saveToDatabase } = require('./utils')

const getAllWorkouts = (filterParams) => {
  try {
    let workouts = DB.workouts
    if (filterParams.mode) {
      return DB.workouts.filter((workout) => workout.mode.toLowerCase().includes(filterParams.mode.toLowerCase()))
    }
    return DB.workouts
  } catch {
    throw {
      status: 500,
      message: error?.message || 'Internal Server Error'
    }
  }

}

const getOneWorkout = (workoutID) => {
  try {
    const workout = DB.workouts.find((workout) => workout.id === workoutID)
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || 'Internal Server Error'
    }
  }
  if (!workout) {
    throw {
      status: 404,
      message: `No workout found with the id of ${workoutID}`
    }
  }
  return workout
}

const createNewWorkout = (newWorkout) => {
  const isAlreadyAdded =
    DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1
  console.log(isAlreadyAdded);
  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Workout with the name ${newWorkout.name} already exists`
    }
  }
  try {
    DB.workouts.push(newWorkout)
    saveToDatabase(DB)
    return newWorkout
  } catch {
    throw {
      status: 500,
      message: error?.message || 'Internal Server Error'
    }
  }
}

const updateOneWorkout = (workoutID, changes) => {
  const indexForUpdate = DB.workouts.findIndex(
    (workout) => (
      workout.id === workoutID
    )
  )
  if (indexForUpdate === -1) {
    throw {
      status: 404,
      message: `No workout found with the id of ${workoutID}`
    }
  }
  try {

    const updatedWorkout = {
      ...DB.workouts[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleDateString('en-US', { timeZone: "UTC" })
    }

    DB.workouts[indexForUpdate] = updatedWorkout

    saveToDatabase(DB)
    return updatedWorkout
  } catch {
    throw {
      status: 500,
      message: error?.message || 'Internal Server Error'
    }
  }
}

const deleteOneWorkout = (workoutID) => {
  const indexForDelete = DB.workouts.findIndex(
    (workoud) => workoud.id === workoutID
  )
  if (indexForDelete === -1) {
    throw {
      status: 404,
      message: `No workout found with the id of ${workoutID}`
    }
  }
  try {
    DB.workouts.splice(indexForDelete, 1)
    saveToDatabase(DB)
  } catch {
    throw {
      status: 500,
      message: error?.message || 'Internal Server Error'
    }
  }
}


module.exports = { getAllWorkouts, createNewWorkout, getOneWorkout, updateOneWorkout, deleteOneWorkout }