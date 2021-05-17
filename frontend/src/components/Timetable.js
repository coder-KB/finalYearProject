import React, { useEffect, useState } from "react";
import { getTimeTable } from "../api/timetable";
import SingleClass from "./SingleClass";
import Loading from "./loading/Loading";
import Home from "./Home";

const Timetable = () => {
    const [timetable, setTimetable] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        getTimeTable().then((data) => {
            setLoading(false);
            if (data.error) {
                setError(data.error);
            } else {
                setTimetable(data.data);
            }
        });
    }, []);

    const errorMessage = (error) => {
        if (error) {
            return <h3 className="text-warning text-center m-5">{error}</h3>;
        }
    };

    return (
        <Home>
            {loading && <Loading />}
            {errorMessage(error)}
            {timetable &&
                timetable.map((tt, ind) => (
                    <SingleClass
                        key={ind}
                        clsName={tt.className}
                        result={tt.result}
                    />
                ))}
        </Home>
    );
};

export default Timetable;
