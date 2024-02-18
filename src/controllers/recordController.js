const recordService = require('../services/recordServices')

const getRecordForWorkout = (req, res) => {
  const { params: { workoutID } } = req
  if (!workoutID) {
    res.status(400).send({ status: 'FAILED', data: { error: `Parameter '${workoutID}  can not be empty` } })
    return
  }
  try {
    const records = recordService.getRecordForWorkout(workoutID)
    res.send({ status: 'ok', data: records })
  } catch (error) {
    res.status(error?.status || 500).send({ status: 'FAILED', data: { error: error?.message || error } })
  }
}

module.exports = { getRecordForWorkout }