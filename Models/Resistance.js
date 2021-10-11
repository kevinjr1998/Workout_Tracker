const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resistanceSchema = new Schema({
    type: String,
    name: String,
    duration: Number,
    weight: Number,
    reps: Number,
    sets: Number,
});

const Resistance = mongoose.model("Resistance", resistanceSchema);

module.Exercise = Resistance;
