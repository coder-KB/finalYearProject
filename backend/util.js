const fs = require("fs");
const csv = require("csv-parser");

const allRows = [];
fs.createReadStream("./data_for_time_table.csv")
  .pipe(csv())
  .on("data", (row) => {
    allRows.push(row);
  })
  .on("end", () => {
    convert(allRows);
  });

function convert(allRows) {
  const allClasses = [];
  const currClass = {};
  for (let i = 0; i < allRows.length; ++i) {
    const row = allRows[i];
    const cls = row.Class.trim();
    if (!currClass || currClass.class != cls) {
      allClasses.push({ ...currClass });
      currClass.class = cls;
      currClass.subject_teacher = [];
    }
    currClass.subject_teacher.push({
      subCode: row.subCode.trim(),
      teacherName: row.teacherName.trim(),
      credits: row.credits ? parseInt(row.credits) : "",
      isLab: row.isLab.trim() == "TRUE" ? true : false,
      startSlot: row.startSlot ? parseInt(row.startSlot) : "",
    });
  }
  allClasses.push(currClass);
  allClasses.splice(0, 1);

  fs.writeFile("data.json", JSON.stringify({ data: allClasses }), (err) => {
    if (err) throw err;
    console.log("done");
  });
}
