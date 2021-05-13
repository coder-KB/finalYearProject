var express = require("express");
var router = express.Router();

const {
    createTeacher,
    getTeachersList,
    getTeacherByInitial,
    getSingleTeacher,
    updateTeacher,
    removeTeacher,
} = require("../controllers/teacher");

router.param("initial", getTeacherByInitial);

router.post("/create", createTeacher);
router.get("/all", getTeachersList);
router.get("/:initial", getSingleTeacher);
router.put("/:initial", updateTeacher);
router.delete("/:initial", removeTeacher);

module.exports = router;
