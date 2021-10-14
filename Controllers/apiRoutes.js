const router = require("express").Router();
const {Workout, Exercise} = require("../Models");


router.get(`/api/workouts`, (req, res) => {
    Workout.aggregate([
        {
        $addFields: {
        totalDuration: { $sum: "$exercises.duration"},
        },
      }
      ])
    .sort({"day": -1})
    .then(dbWorkouts => {
      console.log(dbWorkouts);
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


router.get(`/api/workouts/range`, (req, res) => {
  Workout.
  aggregate([
    {
    $addFields: {
    totalDuration: { $sum: "$exercises.duration"},
    totalWeight: {$sum: "$exercises.weight"},
    },
  }
  ])
  .sort({"day": -1 })
  .limit(7)
  .then(dbWorkouts => {
  console.log(dbWorkouts);
  res.json(dbWorkouts);
})
.catch(err => {
  res.status(400).json(err);
});
});
module.exports = router;