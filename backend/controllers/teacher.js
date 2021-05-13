const Teacher = require("../models/Teacher");

exports.createTeacher = (req, res) => {
    let teacher = new Teacher({
        name: req.body.name,
        initial: req.body.initial,
    });

    teacher.save((err) => {
        if (err) {
            res.status(422).json({
                error: "Error in creation of teacher",
            });
        }

        res.json({
            message: "Teacher Created Successfully",
        });
    });
};

exports.getTeachersList = async (req, res) => {
    Teacher.find({}, (err, data) => {
        if (err) {
            res.status(422).json({
                error: "Error in creation of teacher",
            });
        }

        res.json(data);
    });
};

exports.getTeacherByInitial = (req, res, next, initial) => {
    Teacher.findOne({ initial }).exec((err, teacher) => {
        if (err || !teacher) {
            return res.status(400).json({
                error: "Teacher not found in DB",
            });
        }
        req.teacher = teacher;
        next();
    });
};

exports.getSingleTeacher = (req, res) => {
    return res.json(req.teacher);
};

exports.updateTeacher = (req, res) => {
    const teacher = req.teacher;
    teacher.name = req.body.name;
    teacher.initial = req.body.initial;

    teacher.save((err, updatedTeacher) => {
        if (err || !updatedTeacher) {
            return res.status(400).json({
                error: "Not able to update category in DB",
            });
        }

        res.json(updatedTeacher);
    });
};

exports.removeTeacher = (req, res) => {
    const teacher = req.teacher;
    teacher.remove((err, teacher) => {
        if (err || !teacher) {
            return res.status(400).json({
                error: "Not able to update category in DB",
            });
        }

        res.json({
            message: `Successfully deleted ${teacher.name}`,
        });
    });
};
