import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { authenticate, isAuthenticated, signInUser } from "../../api/user";
import Home from "../Home";
import "./SignInUp.css";

const SignIn = () => {
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
        didRedirect: false,
        error: "",
    });

    const { email, password, didRedirect, error } = userDetails;
    const { user } = isAuthenticated();

    const handleChange = (name) => (event) => {
        setUserDetails({
            ...userDetails,
            error: false,
            [name]: event.target.value,
        });
    };
    const onSubmit = (event) => {
        event.preventDefault();
        signInUser({ email, password }).then((data) => {
            console.log(data);
            if (!data.err) {
                authenticate(data, () => {
                    setUserDetails({
                        ...userDetails,
                        email: "",
                        password: "",
                        didRedirect: true,
                        error: false,
                    });
                });
            } else {
                console.log(data.err);
                setUserDetails({ ...userDetails, error: data.err });
            }
        });
    };

    const performRedirect = () => {
        if (didRedirect) {
            if (user && user.role === 1) {
                console.log("admin");
                return <Redirect to="/admin/dashboard" />;
            } else {
                console.log("normal user");
                return <Redirect to="/" />;
            }
        }

        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };
    const errorMessage = () => {
        return (
            <div className="row">
                <div className="col-md-12 text-left">
                    <div
                        className="alert alert-danger"
                        style={{ display: error ? "" : "none" }}
                    >
                        {error}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Home>
            <div className="Main">
                <div className="Container">
                    {performRedirect()}
                    {errorMessage()}
                    <div className="Wrap">
                        <h2 className="text-center text-warning">
                            SignIn Page
                        </h2>
                        <form>
                            <div className="form-group FormGroup">
                                <label className="Label form-control">
                                    Email address
                                </label>
                                <input
                                    value={email}
                                    name={email}
                                    onChange={handleChange("email")}
                                    type="email"
                                    className="Input form-control"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div className="form-group FormGroup">
                                <label className="Label form-control">
                                    Password
                                </label>
                                <input
                                    value={password}
                                    name={password}
                                    onChange={handleChange("password")}
                                    type="password"
                                    className="Input form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="form-group FormGroup">
                                <button
                                    onClick={onSubmit}
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                        <Link className="text-white text-center" to="/signup">
                            New User, Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </Home>
    );
};

export default SignIn;
