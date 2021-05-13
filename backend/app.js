const express = require("express");
const timetableRoutes = require("./routers/timetable");
const teacherRoutes = require("./routers/teacher");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
    res.send("Hello There");
});

app.use("/timetable", timetableRoutes);
app.use("/teacher", teacherRoutes);

app.listen(port, () => {
    mongoose
        .connect("mongodb://localhost:27017/fyp", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((response) => {
            console.log("DB Connected");
        });
    console.log(`backend listening at http://localhost:${port}`);
});
