const Sequelize = require('sequelize');

const databaseUrl = process.env.DATABASE_URL || 'postgres://localhost:5432/fitness-tracker'
const db = new Sequelize(
  databaseUrl,
  {
    logging: false,
    operatorsAliases: false,
  }
)

const Workout = db.define("workouts",{
    name:Sequelize.STRING,
    date:Sequelize.DATE,
});

const Exercise = db.define("exercises",{
    name:Sequelize.STRING,
    description:Sequelize.TEXT,
    completed:Sequelize.BOOLEAN,
});

Workout.hasMany(Exercise);
Exercise.belongsTo(Workout);

module.exports={
    db,
    Workout,
    Exercise
}