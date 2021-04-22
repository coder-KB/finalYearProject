exports.getTimeTable = () => {
  return fetch("http://localhost:4000/timetable/")
    .then((response) => response.json())
    .catch((err) => console.log(err));
};
