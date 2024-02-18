const workoutServices = require('../services/workoutServices')

const getAllWorkouts = (req, res) => {
  const { mode } = req.query
  try {
    const allWorkouts = workoutServices.getAllWorkouts({ mode })
    res.send({ status: 'ok', data: allWorkouts })
  } catch (error) {
    res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const getOneWorkout = (req, res) => {
  const { params: { workoutID } } = req

  if (!workoutID) {
    res.status(400).send({ status: 'FAILED', data: { error: `Parameter '${workoutID}  can not be empty` } })
    return
  }
  try {

    const workout = workoutServices.getOneWorkout(workoutID)
    res.send({ status: 'ok', data: workout })
  }
  catch (error) {
    res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const createNewWorkout = (req, res) => {
  const { body } = req
  if (!body.name || !body.mode || !body.equipment || !body.exercises || !body.trainerTips) {
    res.status(400).send({
      status: "FAILED", data: { error: "Uno de los siguientes key´s no esta o esta vacia: name, mode, equipment, exercises, trainerTips" }
    })
  }
  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips
  }
  try {
    const createdWorkout = workoutServices.createNewWorkout(newWorkout)
    res.status(201).send({ status: 'OK', data: createdWorkout })
  } catch (error) {
    res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const updateOneWorkout = (req, res) => {
  const { body,
    params: { workoutID }
  } = req
  if (!workoutID) {
    res.status(400).send({ status: 'FAILED', data: { error: `Parameter '${workoutID}  can not be empty` } })
    return
  }
  try {
    const updatedWorkout = workoutServices.updateOneWorkout(workoutID, body)
    res.send({ status: 'updated', data: updatedWorkout })
  } catch (error) {
    res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

const deleteOneWorkout = (req, res) => {
  const {
    params: { workoutID }
  } = req

  if (!workoutID) {
    res.status(400).send({ status: 'FAILED', data: { error: `Parameter '${workoutID}  can not be empty` } })
    return
  }
  try {

    workoutServices.deleteOneWorkout(workoutID)
    res.status(204).send({ status: 'deleted' })
  } catch (error) {
    res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout
}