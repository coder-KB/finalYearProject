const express = require("express");
const timetableRoutes = require("./routers/timetable");
const teacherRoutes = require("./routers/teacher");
const sectionRoutes = require("./routers/section");
const userRoutes = require("./routers/user");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 4000;

require("dotenv").config();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
    res.send("Hello There");
});

app.use("/timetable", timetableRoutes);
app.use("/teacher", teacherRoutes);
app.use("/section", sectionRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
    mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then((response) => {
            console.log("DB Connected");
        })
        .catch((err) => {
            console.log(err);
        });
    console.log(`backend listening at http://localhost:${port}`);
});
