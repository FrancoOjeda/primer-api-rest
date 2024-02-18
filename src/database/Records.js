const DB = require('./db.json')

const getRecordForWorkout = (workoutID) => {
  try {
    const record = DB.records.filter((record) => record.workout === workoutID)
    if (record.length === 0) {
      throw {
        status: 400,
        message: `Can't find record for ${workoutID}`
      }
    }
    return record
  } catch (error) {
    throw {
      status: error?.status || 500, message: error?.message || error
    }
  }
}
module.exports = { getRecordForWorkout }