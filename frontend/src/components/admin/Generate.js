import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { generateTimeTable } from "../../api/timetable";
import Home from "../Home";
import Loading from "../loading/Loading";

const Generate = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        generateTimeTable().then((data) => {
            console.log(data);
            setLoading(false);
        });
    }, []);

    return (
        <Home>
            {loading && <Loading />}
            {!loading && (
                <div className="container-sm text-center m-5">
                    <h2>Time Table Generated Successfully</h2>
                    <Link to="/timetable">View TimeTable</Link>
                </div>
            )}
        </Home>
    );
};

export default Generate;
