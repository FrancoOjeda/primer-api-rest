const workoutServices = require('../services/workoutServices')

const getAllWorkouts = (req, res) => {
  const allWorkouts = workoutServices.getAllWorkouts()
  res.send({ status: 'ok', data: allWorkouts })
}

const getOneWorkout = (req, res) => {
  const { params: { workoutID } } = req

  if (!workoutID) {
    return
  }
  const workout = workoutServices.getOneWorkout(workoutID)
  res.send({ status: 'ok', data: workout })
  // const workout = workoutServices.getOneWorkout(req.params.workoutID)
  // res.send(`Get workout ${req.params.workoutID}`)
}

const createNewWorkout = (req, res) => {
  const { body } = req
  if (!body.name || !body.mode || !body.equipment || !body.exercises || !body.trainerTips) {
    return
  }
  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips
  }
  const createdWorkout = workoutServices.createNewWorkout(newWorkout)
  res.status(201).send({ status: 'OK', data: createdWorkout })
}

const updateOneWorkout = (req, res) => {
  const { body,
    params: { workoutID }
  } = req
  if (!workoutID) {
    return
  }

  const updatedWorkout = workoutServices.updateOneWorkout(workoutID, body)
  res.send({ status: 'updated', data: updatedWorkout })
}

const deleteOneWorkout = (req, res) => {
  const {
    params: { workoutID }
  } = req

  if (!workoutID) {
    return
  }

  workoutServices.deleteOneWorkout(workoutID)
  res.status(204).send({ status: 'deleted' })
}

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout
}