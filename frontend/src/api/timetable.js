const { API } = require("../backend");

exports.getTimeTable = () => {
    return fetch(`${API}/timetable/`)
        .then((response) => response.json())
        .catch((err) => console.log(err));
};
