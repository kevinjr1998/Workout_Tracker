const router = require("express").Router();
const { Workout } = require("../Models");
var ObjectId = require('mongoose').Types.ObjectId; 


router.get(`/api/workouts`, (req, res) => {
    Workout.aggregate([
        {
        $addFields: {
        totalDuration: { $sum: "$exercises.duration"},
        },
      }
      ])
    .sort({"day": 1})
    .then(dbWorkouts => {
      console.log(dbWorkouts);
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/workouts", (req,res) => {
  Workout.create(req.body)
  .then((newWorkout => {
    res.json(newWorkout);
  }))
  .catch(err => res.json(err))
});

router.put("/api/workouts/:id", (req ,res) => {
  console.log(req.params.id, req.body);
  debugger;
  Workout.findOneAndUpdate(
    {_id: req.params.id},
    { 
    $push: {exercises: req.body},
    }, 
    {new: true},
  )
  .then(newExercise => {
  debugger;
  console.log("newExercise: " + newExercise);
  res.json(newExercise);
})
  .catch(err => res.json(err))
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