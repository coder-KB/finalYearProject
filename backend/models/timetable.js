const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let timetableSchema = new Schema({
    data: Array,
});

module.exports = mongoose.model("Timetable", timetableSchema);
