import React from "react";
import Navbar from "./navbar/Navbar";

const Home = ({ children }) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default Home;
