import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTeacher, updateTeacher } from "../../../api/teacher";
import Home from "../../Home";

const UpdateTeacher = ({ match }) => {
    const [name, setName] = useState("");
    const [initial, setInitial] = useState("");
    const [oldInitial, setOldInitial] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const preload = (initial) => {
        getTeacher(initial).then((data) => {
            if (data.error) {
                setError(true);
            } else {
                setName(data.name);
                setInitial(data.initial);
                setOldInitial(data.initial);
            }
        });
    };

    useEffect(() => {
        preload(match.params.teacherInitial);
    }, []);

    const goBack = () => {
        return (
            <div className="mt-5 p-5">
                <Link
                    className="btn btn-sm btn-danger mb-3"
                    to="/admin/dashboard"
                >
                    Admin Home
                </Link>
            </div>
        );
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        updateTeacher({ name, initial }, oldInitial)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setSuccess(true);
                    setName("");
                    setInitial("");
                }
            })
            .catch((err) => {
                console.log(err);
                setError("some error occured");
            });
    };

    const successMessage = () => {
        if (success) {
            return (
                <h4 className="text-success">Teacher Updated successfully</h4>
            );
        }
    };

    const warningMessage = () => {
        if (error) {
            return <h4 className="text-warning">{error}</h4>;
        }
    };

    const categoryForm = () => {
        return (
            <form>
                <div className="form-group FormGroup">
                    <label className="Label form-control">Teacher Name</label>
                    <input
                        value={name}
                        name={name}
                        type="text"
                        className="Input form-control"
                        aria-describedby="basic-addon1"
                        placeholder="Enter teacher Name"
                        onChange={(e) => {
                            setName(e.target.value);
                            setSuccess(false);
                            setError(false);
                        }}
                    />
                </div>
                <div className="form-group FormGroup">
                    <label className="Label form-control">
                        Teacher Initials
                    </label>
                    <input
                        value={initial}
                        name={initial}
                        type="email"
                        className="Input form-control"
                        aria-describedby="emailHelp"
                        placeholder="Enter intials"
                        onChange={(e) => {
                            setSuccess(false);
                            setError(false);
                            setInitial(e.target.value);
                        }}
                    />
                </div>
                <div className="form-group FormGroup">
                    <button onClick={onSubmit} className="btn btn-outline-info">
                        Update Teacher
                    </button>
                </div>
                <br />
            </form>
        );
    };

    return (
        <Home>
            <div className="container bg-info p-4 m-5">
                <h2 className="text-center text-success">Update teacher</h2>
                <div className="row bg-white rounded">
                    <div className="col-md-3">{goBack()}</div>
                    <div className="col-md-7">
                        {successMessage()}
                        {warningMessage()}
                        {categoryForm()}
                    </div>
                </div>
            </div>
        </Home>
    );
};

export default UpdateTeacher;
