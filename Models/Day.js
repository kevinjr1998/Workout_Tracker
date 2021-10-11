const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const daySchema = new Schema({
  day: Date,
  cardio: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cardio",
    }
  ],
  resistance: [
    {
      type: Schema.Types.ObjectId,
      ref: "Resistance",
    }
  ],
});

const Day = mongoose.model("Day", daySchema);

module.exports = Day;
