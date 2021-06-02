import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSection, updateSection } from "../../../api/section";
import { getTeachers } from "../../../api/teacher";
import Home from "../../Home";

const UpdateSection = ({ match }) => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [teachers, setTeachers] = useState([]);
    const [count, setCount] = useState(1);

    const [section, setSection] = useState({
        name: "",
        subjects: [
            {
                subjectName: "",
                subjectCode: "",
                credits: 0,
                teacherName: "",
                isLab: false,
                startSlot: 0,
            },
        ],
    });
    const [oldName, setOldName] = useState("");

    useEffect(() => {
        const preload = (sectionName) => {
            getSection(sectionName).then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setSection({
                        name: data.name,
                        subjects: data.subjects,
                    });
                    setOldName(data.name);
                    setCount(data.subjects.length);
                }
            });

            getTeachers().then((data) => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setTeachers(data);
                }
            });
        };
        preload(match.params.sectionName);
    }, [match]);

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

        updateSection(section, oldName)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setSuccess(true);
                    setCount(1);
                    setSection({
                        ...section,
                        name: "",
                        subjects: [
                            {
                                subjectName: "",
                                subjectCode: "",
                                credits: 0,
                                teacherName: "",
                                isLab: false,
                                startSlot: 0,
                            },
                        ],
                    });
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
                <h4 className="text-success">Section Updated successfully</h4>
            );
        }
    };

    const warningMessage = () => {
        if (error) {
            return <h4 className="text-warning">{error}</h4>;
        }
    };

    const handleCount = (e) => {
        e.preventDefault();
        setCount(count + 1);
        let updatedSubjects = [...section.subjects];
        updatedSubjects.push({
            subjectName: "",
            subjectCode: "",
            credits: 0,
            teacherName: "",
            isLab: false,
            startSlot: 0,
        });
        setSection({
            ...section,
            subjects: updatedSubjects,
        });
    };

    const handleChange = (i, ky) => (e) => {
        const updateSubjects = [...section.subjects];
        updateSubjects[i][ky] =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setSection({ ...section, subjects: updateSubjects });
    };

    const removeSubject = (idx) => {
        const updateSubjects = [...section.subjects];
        updateSubjects.splice(idx, 1);
        console.log(updateSubjects);

        setSection({ ...section, subjects: updateSubjects });
        setCount(count - 1);
    };

    const getInputs = () => {
        let content = [];
        for (let i = 0; i < count; ++i) {
            content.push(
                <div className="row" key={i}>
                    <div className="col-11">
                        <div className="row">
                            <div className="col-3 FormGroup m-0">
                                <input
                                    type="text"
                                    value={section.subjects[i].subjectName}
                                    className="Input form-control"
                                    placeholder="Subject Name"
                                    onChange={handleChange(i, "subjectName")}
                                />
                            </div>
                            <div className="col-2 FormGroup m-0">
                                <input
                                    type="text"
                                    value={section.subjects[i].subjectCode}
                                    onChange={handleChange(i, "subjectCode")}
                                    className="form-control Input"
                                    placeholder="Sub Code"
                                />
                            </div>
                            <div className="col-1 FormGroup m-0">
                                <input
                                    type="checkbox"
                                    value={section.subjects[i].isLab}
                                    checked={section.subjects[i].isLab}
                                    onChange={handleChange(i, "isLab")}
                                    className="m-2"
                                    style={{ height: "20px", width: "20px" }}
                                />
                            </div>
                            <div className="col-2 FormGroup m-0">
                                <select
                                    className="form-control Input my-1 mr-sm-2"
                                    value={
                                        !section.subjects[i].isLab &&
                                        section.subjects[i].teacherName
                                    }
                                    onChange={handleChange(i, "teacherName")}
                                    disabled={section.subjects[i].isLab}
                                >
                                    <option defaultValue>Choose</option>
                                    {teachers.map((teacher) => {
                                        return (
                                            <option
                                                value={teacher.initial}
                                                key={teacher.initial}
                                            >
                                                {teacher.initial}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="col-2 FormGroup m-0">
                                <input
                                    type="number"
                                    value={
                                        !section.subjects[i].isLab &&
                                        section.subjects[i].credits
                                    }
                                    onChange={handleChange(i, "credits")}
                                    className="form-control Input"
                                    placeholder="Credits"
                                    disabled={section.subjects[i].isLab}
                                />
                            </div>
                            <div className="col-2 FormGroup m-0">
                                <input
                                    type="number"
                                    value={
                                        section.subjects[i].isLab &&
                                        section.subjects[i].startSlot
                                    }
                                    onChange={handleChange(i, "startSlot")}
                                    className="Input form-control"
                                    placeholder="Start Slot"
                                    disabled={!section.subjects[i].isLab}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-1">
                        <i
                            className="fas fa-minus-circle fa-2x"
                            style={{ cursor: "pointer", marginTop: "5px" }}
                            onClick={() => removeSubject(i)}
                        ></i>
                    </div>
                </div>
            );
        }

        return <div>{content}</div>;
    };

    const categoryForm = () => {
        return (
            <form>
                <div className="form-group FormGroup row">
                    <label className="col-sm-3 col-form-label Label">
                        Section Name
                    </label>
                    <div className="col-sm-9">
                        <input
                            type="text"
                            value={section.name}
                            className="Input form-control"
                            placeholder="Enter section Name"
                            onChange={(e) =>
                                setSection({
                                    ...section,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>

                <div className="container border border-primary pb-2">
                    <div className="row">
                        <div className="col-11">
                            <div className="row">
                                <div className="col-3">
                                    <label className="Label">
                                        Subject Name
                                    </label>
                                </div>
                                <div className="col-2">
                                    <label className="Label">Sub Code</label>
                                </div>
                                <div className="col-1">
                                    <label className="Label">isLab</label>
                                </div>
                                <div className="col-2">
                                    <label className="Label">Teacher</label>
                                </div>
                                <div className="col-2">
                                    <label className="Label">Credits</label>
                                </div>
                                <div className="col-2">
                                    <label className="Label">Start Slot</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {getInputs()}

                    <div className="form-group text-center">
                        <button
                            onClick={handleCount}
                            className="btn btn-outline-success"
                        >
                            <i className="fas fa-plus-circle"></i> Add More
                            Subject
                        </button>
                    </div>
                </div>
                <div className="form-group FormGroup">
                    <button onClick={onSubmit} className="btn btn-outline-info">
                        Update Section
                    </button>
                </div>
                <br />
            </form>
        );
    };

    return (
        <Home>
            <div className="container bg-info p-4 m-5">
                <h2 className="text-center text-success">Update section</h2>
                <div className="row bg-white rounded">
                    <div className="col-md-2">{goBack()}</div>
                    <div className="col-md-10">
                        {successMessage()}
                        {warningMessage()}
                        {categoryForm()}
                    </div>
                </div>
            </div>
        </Home>
    );
};

export default UpdateSection;
