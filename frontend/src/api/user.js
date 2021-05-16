const { API } = require("../backend");

exports.signUpUser = (user) => {
    return fetch(`${API}/user/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }).then((response) => {
        return response.json();
    });
};

exports.signInUser = (user) => {
    return fetch(`${API}/user/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    }).then((response) => {
        return response.json();
    });
};

exports.signOut = () => {
    if (typeof window !== "undefined") {
        localStorage.removeItem("jwt");
    }
};

exports.isAuthenticated = () => {
    if (typeof window == "undefined") {
        return false;
    }

    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"));
    } else {
        return false;
    }
};

exports.authenticate = (data, next) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};
