const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let teacherSchema = new Schema({
    name: String,
    initial: {
        type: String,
        unique: true,
    },
});

module.exports = mongoose.model("Teacher", teacherSchema);
