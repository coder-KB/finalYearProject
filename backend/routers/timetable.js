var express = require("express");
var router = express.Router();

const {
    generateWholeTimeTable,
    getTimeTable,
} = require("../controllers/timetable");

router.get("/", getTimeTable);
router.get("/generate", generateWholeTimeTable);

module.exports = router;
