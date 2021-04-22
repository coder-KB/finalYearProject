const express = require("express");
const timetableRoutes = require("./routers/timetable");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors({origin: "*"}));

app.get("/", (req, res) => {
  res.send("Hello There");
});

app.use("/timetable", timetableRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
