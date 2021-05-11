import React, { useEffect, useState } from "react";
import { getTimeTable } from "../api/timetable";
import SingleClass from "./SingleClass";
import Loading from "./Loading";

const Timetable = () => {
    const [timetable, setTimetable] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getTimeTable().then((data) => {
            setTimetable(data);
            setLoading(false);
        });
    }, []);

    return (
        <div>
            {loading && <Loading />}
            {timetable &&
                timetable.map((tt, ind) => (
                    <SingleClass
                        key={ind}
                        clsName={tt.className}
                        result={tt.result}
                    />
                ))}
        </div>
    );
};

export default Timetable;
