const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { db } = require('./database');

const workoutRoutes = require('./routes/workouts')
const exerciseRoutes = require('./routes/exercises')

const app = express()

// Use morgan for logging
app.use(morgan('dev'))

// Make sure we can parse JSON request bodies
app.use(bodyParser.json())

/* Mount the workout and exercise routes. For instance, when a request begins with
   /workouts, we'll hand it off to the router defined in ./routes/workouts.js
  */
app.use('/workouts', workoutRoutes)
app.use('/exercises', exerciseRoutes)

// Serve the index.html file in ./public as a homepage
app.use(express.static('public'))

// If the environment has a PORT defined, use that (otherwise, default to 3030)
const PORT = process.env.PORT || 3030
async function init(){
  try{
    await db.sync({force:false});
    app.listen(PORT, () => {
      console.log(`Getting swole on port ${PORT}`)
    })
  }
  catch(e){
    console.log(e);
  }
}

init();