const { API } = require("../backend");

exports.addsection = (section) => {
    return fetch(`${API}/section/create`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(section),
    }).then((response) => {
        return response.json();
    });
};

exports.getSections = () => {
    return fetch(`${API}/section/all`)
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getSection = (sectionName) => {
    return fetch(`${API}/section/${sectionName}`)
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.deleteSection = (sectionName) => {
    return fetch(`${API}/section/${sectionName}`, {
        method: "DELETE",
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.updateSection = (section, sectionName) => {
    return fetch(`${API}/section/${sectionName}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(section),
    }).then((response) => {
        return response.json();
    });
};
