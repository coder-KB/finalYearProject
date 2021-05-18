import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteTeacher, getTeachers } from "../../../api/teacher";
import Home from "../../Home";

const ManageTeachers = () => {
    const [teachers, setTeachers] = useState([]);

    const preload = () => {
        getTeachers().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setTeachers(data);
            }
        });
    };

    useEffect(() => {
        preload();
    }, []);

    const deleteThisTeacher = (initial) => {
        deleteTeacher(initial).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                preload();
            }
        });
    };

    return (
        <Home>
            <div className="container bg-info p-4 m-5">
                <h2 className="mb-4">All Teachers</h2>
                <Link className="btn btn-danger" to={`/admin/dashboard`}>
                    <span className="">Admin Home</span>
                </Link>
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center text-white my-3">
                            Total {teachers.length} teachers
                        </h2>

                        {teachers &&
                            teachers.map((teacher, index) => (
                                <div
                                    className="row text-center mb-2"
                                    key={index}
                                >
                                    <div className="col-4">
                                        <h3 className="text-white text-left text-nowrap">
                                            {teacher.name}
                                        </h3>
                                    </div>
                                    <div className="col-4">
                                        <Link
                                            className="btn btn-success"
                                            to={`/admin/teacher/update/${teacher.initial}`}
                                        >
                                            <span className="">Update</span>
                                        </Link>
                                    </div>
                                    <div className="col-4">
                                        <button
                                            onClick={() => {
                                                deleteThisTeacher(
                                                    teacher.initial
                                                );
                                            }}
                                            className="btn btn-danger"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </Home>
    );
};

export default ManageTeachers;
