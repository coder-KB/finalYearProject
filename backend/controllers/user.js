const User = require("../models/user");

exports.signup = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                err: "NOT able to save user in db",
            });
        }

        res.json({
            name: user.name,
            email: user.email,
            role: user.role,
        });
    });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User email does not exist",
            });
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password does not match",
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
