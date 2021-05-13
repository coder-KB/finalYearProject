const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let sectionSchema = new Schema({
    name: String,
    subjects: [
        {
            subjectCode: String,
            subjectName: String,
            credits: Number,
            teacherName: String,
            isLab: {
                type: Boolean,
                default: false,
            },
            startSlot: Number,
        },
    ],
});

module.exports = mongoose.model("Section", sectionSchema);
