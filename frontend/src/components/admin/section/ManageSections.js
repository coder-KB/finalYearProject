import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteSection, getSections } from "../../../api/section";
import { deleteTeacher, getTeachers } from "../../../api/teacher";
import Home from "../../Home";

const ManageSections = () => {
    const [sections, setSections] = useState([]);

    const preload = () => {
        getSections().then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setSections(data);
            }
        });
    };

    useEffect(() => {
        preload();
    }, []);

    const deleteThisSection = (sectionName) => {
        deleteSection(sectionName).then((data) => {
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
                <h2 className="mb-4">All Sections</h2>
                <Link className="btn btn-danger" to={`/admin/dashboard`}>
                    <span className="">Admin Home</span>
                </Link>
                <div className="row">
                    <div className="col-12">
                        <h2 className="text-center text-white my-3">
                            Total {sections.length} sections
                        </h2>

                        {sections &&
                            sections.map((section, index) => (
                                <div
                                    className="row text-center mb-2"
                                    key={index}
                                >
                                    <div className="col-4">
                                        <h3 className="text-white text-left">
                                            {section.name}
                                        </h3>
                                    </div>
                                    <div className="col-4">
                                        <Link
                                            className="btn btn-success"
                                            to={`/admin/section/update/${section.name}`}
                                        >
                                            <span className="">Update</span>
                                        </Link>
                                    </div>
                                    <div className="col-4">
                                        <button
                                            onClick={() => {
                                                deleteThisSection(section.name);
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

export default ManageSections;
