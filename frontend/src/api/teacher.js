const { API } = require("../backend");

exports.addteacher = (teacher) => {
    return fetch(`${API}/teacher/create`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(teacher),
    }).then((response) => {
        return response.json();
    });
};

exports.getTeachers = () => {
    return fetch(`${API}/teacher/all`)
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getTeacher = (initial) => {
    return fetch(`${API}/teacher/${initial}`)
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.deleteTeacher = (initial) => {
    return fetch(`${API}/teacher/${initial}`, {
        method: "DELETE",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.updateTeacher = (teacher, initial) => {
    return fetch(`${API}/teacher/${initial}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(teacher),
    }).then((response) => {
        return response.json();
    });
};
