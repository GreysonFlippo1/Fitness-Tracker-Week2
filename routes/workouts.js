const express = require('express')
const { Workout } = require('../database')
const router = express.Router()

// GET all workouts
router.get('/', async (req, res, next) => {
  try{
    res.json(await Workout.findAll());
  }
  catch(e){
    next(e);
  }
})

// GET a single workout by id
router.get('/:id', async (req, res, next) => {
  try{
    const workout = await Workout.findByPk(+req.params.id)
    if (!workout) return res.sendStatus(404)
    res.json(workout)
  }
  catch(e){
    next(e);
  }
})

// POST a new workout
router.post('/', async (req, res, next) => {
  try{
    const { name, date } = req.body
    res.status(201)
    res.json(await Workout.create({ name, date }))
  }
  catch(e){
    next(e);
  }
})

// DELETE a workout by id
router.delete('/:id', async (req, res, next) => {
  try{
    const workout = await Workout.findByPk(+req.params.id)
    if (!workout) return res.sendStatus(404)
    await workout.destroy()
    res.sendStatus(204)
  }
  catch(e){
    next(e);
  }
})

module.exports = router
