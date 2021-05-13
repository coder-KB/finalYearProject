var express = require("express");
var router = express.Router();

const {
    createSection,
    getSectionsList,
    getSectionByName,
    getSingleSection,
    updateSection,
    removeSection,
} = require("../controllers/section");

router.param("sectionName", getSectionByName);

router.post("/create", createSection);
router.get("/all", getSectionsList);
router.get("/:sectionName", getSingleSection);
router.put("/:sectionName", updateSection);
router.delete("/:sectionName", removeSection);

module.exports = router;
