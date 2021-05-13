const Section = require("../models/Section");

exports.createSection = (req, res) => {
    let section = new Section({
        name: req.body.name,
        subjects: req.body.subjects,
    });

    section.save((err) => {
        if (err) {
            res.status(422).json({
                error: "Error in creation of Section",
            });
        }

        res.json({
            message: "Section Created Successfully",
        });
    });
};

exports.getSectionsList = async (req, res) => {
    Section.find({}, (err, data) => {
        if (err) {
            res.status(422).json({
                error: "Error in retreiving of Sections",
            });
        }

        res.json(data);
    });
};

exports.getSectionByName = (req, res, next, sectionName) => {
    Section.findOne({ sectionName }).exec((err, Section) => {
        if (err || !Section) {
            return res.status(400).json({
                error: "Section not found in DB",
            });
        }
        req.section = section;
        next();
    });
};

exports.getSingleSection = (req, res) => {
    return res.json(req.section);
};

exports.updateSection = (req, res) => {
    const section = req.Section;
    Section.name = req.body.name;
    Section.subjects = req.body.subjects;

    section.save((err, updatedSection) => {
        if (err || !updatedSection) {
            return res.status(400).json({
                error: "Not able to update section in DB",
            });
        }

        res.json(updatedSection);
    });
};

exports.removeSection = (req, res) => {
    const section = req.section;
    section.remove((err, section) => {
        if (err || !section) {
            return res.status(400).json({
                error: "Not able to remove section in DB",
            });
        }

        res.json({
            message: `Successfully deleted ${section.name}`,
        });
    });
};
