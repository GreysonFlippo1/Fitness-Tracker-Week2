const express = require('express')
const { Exercise } = require('../fakeDatabase')
const router = express.Router()

// GET all exercises
router.get('/', async (req, res, next) => {
  try{
    res.json(await Exercise.findAll())
  }
  catch(e){
    next(e);
  }
})

// GET a single exercise by id
router.get('/:id', async (req, res, next) => {
  try{
    const exercise = await Exercise.findByPk(+req.params.id)
    if (!exercise) return res.sendStatus(404)
    res.json(exercise)
  }
  catch(e){
    next(e);
  }
})

// POST a new exercise
router.post('/', async (req, res, next) => {
  try{
    const { name, completed, description } = req.body
    res.status(201)
    res.json(await Exercise.create({ name, completed, description }))
  }
  catch(e){
    next(e);
  }
})

// DELETE an exercise by id
router.delete('/:id', async (req, res, next) => {
  try{
    const exercise = await Exercise.findByPk(+req.params.id)
    if (!exercise) return res.sendStatus(404)
    await exercise.destroy()
    res.sendStatus(204)
  }
  catch(e){
    next(e);
  }
})

module.exports = router
