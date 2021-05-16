import React, { useEffect, useState } from "react";
import "./Loading.css";

const Loading = () => {
    const [idx, setIdx] = useState(0);

    const text = "Generating Time Table ...";

    useEffect(() => {
        const interval = setInterval(() => {
            setIdx((idx) => (idx === text.length ? 1 : idx + 1));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="Loading">
            <h2>{text.slice(0, idx)}</h2>
            <div className="Kinetic"></div>
        </div>
    );
};

export default Loading;
