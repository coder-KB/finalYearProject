var express = require("express");
var router = express.Router();

const { generateWholeTimeTable } = require("../controllers/timetable");

router.get("/", generateWholeTimeTable);

module.exports = router;
