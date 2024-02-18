const express = require('express')
const router = express.Router()


const workoutController = require('../../controllers/workoutController.js')
const recordController = require('../../controllers/recordController.js')


/**
 * @openapi
 * /api/v1/workouts:
 *   get:
 *     tags:
 *       - Workouts
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
router
  .get('/', workoutController.getAllWorkouts)
  .get('/:workoutID', workoutController.getOneWorkout)
  .get('/:workoutID/records', recordController.getRecordForWorkout)
  .post('/', workoutController.createNewWorkout)
  .patch('/:workoutID', workoutController.updateOneWorkout)
  .delete('/:workoutID', workoutController.deleteOneWorkout)

module.exports = router
