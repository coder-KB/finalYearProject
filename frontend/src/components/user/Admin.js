import React from "react";
import { Link } from "react-router-dom";

const Admin = ({ name }) => {
    return (
        <div
            className="container bg-body text-primary mt-5 text-center"
            style={{ width: "800px" }}
        >
            <hr></hr>
            <h3>
                Hello <span className="text-capitalize">{name}</span>
            </h3>
            <br></br>
            <p className="lead">
                This application is build as an final year project in JSS
                Science and Technology University by a group of students.
            </p>
            <p className="lead">
                Welcome to our application, This is an{" "}
                <span className="text-warning">Admin Page.</span>
            </p>

            <Link
                to="/timetable"
                type="button"
                className="btn btn-outline-primary mb-3"
            >
                View TimeTable
            </Link>

            <p>
                Thank you for visiting our website{" "}
                <i className="fas fa-praying-hands"></i>.
            </p>
            <hr></hr>
        </div>
    );
};

export default Admin;
