const { API } = require("../backend");

exports.generateTimeTable = () => {
    return fetch(`${API}/timetable/generate`)
        .then((response) => response.json())
        .catch((err) => console.log(err));
};

exports.getTimeTable = () => {
    return fetch(`${API}/timetable/`)
        .then((response) => response.json())
        .catch((err) => console.log(err));
};
