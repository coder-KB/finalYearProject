const User = require("../models/user");
const Teacher = require("../models/Teacher");

const checkTeacher = (user) => {
    let exist = true;
    Teacher.findOne({ initial: user.name }).exec((err, teacher) => {
        if (err || !teacher) {
            exist = false;
        } else {
            user.role = 2;
        }
    });
};

exports.signup = (req, res) => {
    const user = new User(req.body);
    checkTeacher(user);
    setTimeout(() => {
        user.save((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    err: "User Email already exist",
                });
            }

            res.json({
                name: user.name,
                email: user.email,
                role: user.role,
            });
        });
    }, 1000);
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                err: "User email does not exist",
            });
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                err: "Email and password does not match",
            });
        }

        return res.json({
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    });
};

exports.signout = (req, res) => {
    return res.json({
        message: "Signout Completed",
    });
};

exports.getUserByName = (req, res, next, name) => {
    User.findOne({ name }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found in DB",
            });
        }
        req.profile = user;
        next();
    });
};

// middleware
exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "you are not Admin",
        });
    }
    next();
};
