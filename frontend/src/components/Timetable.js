import React, { useEffect, useState } from "react";
import { getTimeTable } from "../api/timetable";
import SingleClass from "./SingleClass";

const Timetable = () => {
  const [timetable, setTimetable] = useState();

  useEffect(() => {
    getTimeTable().then((data) => {
      setTimetable(data);
    });
  }, []);

  return (
    <div>
      {timetable &&
        timetable.map((tt, ind) => (
          <SingleClass key={ind} clsName={tt.className} result={tt.result} />
        ))}
    </div>
  );
};

export default Timetable;
