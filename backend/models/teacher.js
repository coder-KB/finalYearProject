const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let teacherSchema = new Schema({
  name: String,
  initial: String,
});

module.exports = mongoose.model("Teacher", teacherSchema);
