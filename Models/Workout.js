const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: Date,
  exercises: [
    {
      type: Schema.Types.ObjectId,
      ref: "exercises",
    }
  ],
});

const Day = mongoose.model("Day", daySchema);

module.exports = Day;
