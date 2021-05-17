import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../../api/user";
import Home from "../Home";

const DashBoard = () => {
    const {
        user: { name, email },
    } = isAuthenticated();

    const adminLeftSide = () => {
        return (
            <div className="card">
                <h4 className="card-header bg-dark text-white">
                    Admin Navigation
                </h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link
                            to="/admin/teacher/create"
                            className="nav-link text-success"
                        >
                            Add Teacher
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link
                            to="/admin/teachers"
                            className="nav-link text-success"
                        >
                            Manage Teachers
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link
                            to="/admin/section/create"
                            className="nav-link text-success"
                        >
                            Create Section
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link
                            to="/admin/sections"
                            className="nav-link text-success"
                        >
                            Manage Sections
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link
                            to="/admin/timetable"
                            className="nav-link text-success"
                        >
                            Generate Time Table
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/timetable" className="nav-link text-success">
                            View Time Table
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminRightSide = () => {
        return (
            <div className="card mb-4">
                <h4 className="card-header">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="text-white bg-success p-1 mr-2">
                            Name:
                        </span>{" "}
                        {name}
                    </li>
                    <li className="list-group-item">
                        <span className="text-white bg-success p-1 mr-2">
                            Email:
                        </span>{" "}
                        {email}
                    </li>
                    <li className="list-group-item">
                        <span className="text-white bg-danger p-1 mr-2">
                            Admin Area
                        </span>
                    </li>
                </ul>
            </div>
        );
    };

    return (
        <Home>
            <div className="container bg-success p-4 m-5">
                <div className="row">
                    <div className="col-4">{adminLeftSide()}</div>
                    <div className="col-8">{adminRightSide()}</div>
                </div>
            </div>
        </Home>
    );
};

export default DashBoard;
