import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUpUser } from "../../api/user";
import Home from "../Home";
import "./SignInUp.css";

const SignUp = () => {
    const [user, setUser] = useState({
        userName: "",
        email: "",
        password: "",
        success: false,
        error: false,
    });

    const { userName, email, password, success, error } = user;

    const handleChange = (name) => (event) => {
        setUser({ ...user, error: false, [name]: event.target.value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        signUpUser({ name: userName, email, password })
            .then((data) => {
                if (!data.err) {
                    setUser({
                        ...user,
                        userName: "",
                        email: "",
                        password: "",
                        success: true,
                        error: false,
                    });
                } else {
                    console.log(data.err);
                    setUser({ ...user, error: data.err });
                }
            })
            .catch((err) => {
                console.log(err.message);
                setUser({ ...user, error: err.message });
            });
    };

    const successMessage = () => {
        return (
            <div className="row">
                <div className="col-md-12 text-left">
                    <div
                        className="alert alert-success"
                        style={{ display: success ? "" : "none" }}
                    >
                        New account was created successfully, Please
                        <Link to="/signin">Login here</Link>
                    </div>
                </div>
            </div>
        );
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
                    {successMessage()}
                    {errorMessage()}
                    <div className="Wrap">
                        <h2 className="text-center text-warning">
                            SignUp Page
                        </h2>
                        <form>
                            <div className="form-group FormGroup">
                                <label className="Label form-control">
                                    User Name
                                </label>
                                <input
                                    value={userName}
                                    name={userName}
                                    type="text"
                                    className="Input form-control"
                                    aria-describedby="basic-addon1"
                                    placeholder="Enter User Name"
                                    onChange={handleChange("userName")}
                                />
                            </div>
                            <div className="form-group FormGroup">
                                <label className="Label form-control">
                                    Email address
                                </label>
                                <input
                                    value={email}
                                    name={email}
                                    type="email"
                                    className="Input form-control"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    onChange={handleChange("email")}
                                />
                            </div>
                            <div className="form-group FormGroup">
                                <label className="Label form-control">
                                    Password
                                </label>
                                <input
                                    value={password}
                                    name={password}
                                    type="password"
                                    className="Input form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                    onChange={handleChange("password")}
                                />
                            </div>
                            <div className="form-group FormGroup">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    onClick={onSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                        <Link className="text-white text-center" to="/signin">
                            Already an User, Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </Home>
    );
};

export default SignUp;
