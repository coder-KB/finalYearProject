import React from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signOut } from "../../api/user";
import "./Navbar.css";

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "rgb(255 193 21)" };
    } else {
        return { color: "#FFFFFF" };
    }
};

const Navbar = ({ history }) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link
                                style={currentTab(history, "/")}
                                className="nav-link mx-3"
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                        {isAuthenticated() &&
                            isAuthenticated().user.role === 1 && (
                                <li className="nav-item">
                                    <Link
                                        style={currentTab(
                                            history,
                                            "/admin/dashboard"
                                        )}
                                        className="nav-link mx-3"
                                        to="/admin/dashboard"
                                    >
                                        DashBoard
                                    </Link>
                                </li>
                            )}
                        {!isAuthenticated() && (
                            <li className="nav-item">
                                <Link
                                    style={currentTab(history, "/signin")}
                                    className="nav-link mx-3"
                                    to="/signin"
                                >
                                    SignIn
                                </Link>
                            </li>
                        )}
                        {!isAuthenticated() && (
                            <li className="nav-item">
                                <Link
                                    style={currentTab(history, "/signup")}
                                    className="nav-link mx-3"
                                    to="/signup"
                                >
                                    SignUp
                                </Link>
                            </li>
                        )}
                        {isAuthenticated() && (
                            <li className="nav-item">
                                <Link
                                    className="nav-link mx-3"
                                    to="/"
                                    onClick={signOut}
                                >
                                    SignOut
                                </Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link
                                style={currentTab(history, "/about")}
                                className="nav-link mx-3"
                                to="/"
                            >
                                About Us
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                style={currentTab(history, "/contact")}
                                className="nav-link mx-3"
                                to="/"
                            >
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                    <span className="navbar-tex m-auto">
                        Time Table Generator Using Genetic Algorithms
                    </span>
                    {isAuthenticated() && (
                        <span className="navbar-tex m-auto">
                            {isAuthenticated().user.name}
                        </span>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default withRouter(Navbar);
