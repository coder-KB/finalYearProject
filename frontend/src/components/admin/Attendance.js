import React from "react";
import Home from "../Home";

const studentDetails = [
    {
        name: "abc",
        usn: "01jst17cs001",
    },
    {
        name: "def",
        usn: "01jst17cs002",
    },
    {
        name: "ghi",
        usn: "01jst17cs003",
    },
    {
        name: "jkl",
        usn: "01jst17cs004",
    },
    {
        name: "mno",
        usn: "01jst17cs005",
    },
    {
        name: "pqr",
        usn: "01jst17cs006",
    },
];

const Attendance = () => {
    return (
        <Home>
            <h2 style={{ textAlign: "center", marginTop: "10px" }}>
                Attendance Page
            </h2>
            <div style={{ width: "800px", margin: "80px auto" }}>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">USN</th>
                            <th scope="col">10/06</th>
                            <th scope="col">11/06</th>
                            <th scope="col">12/06</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentDetails.map((student, idx) => (
                            <tr id={idx}>
                                <th scope="row">{idx + 1}</th>
                                <td>{student.name}</td>
                                <td>{student.usn}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        value={true}
                                        onChange={() => {}}
                                        className="m-2"
                                        style={{
                                            height: "20px",
                                            width: "20px",
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        value={true}
                                        onChange={() => {}}
                                        className="m-2"
                                        style={{
                                            height: "20px",
                                            width: "20px",
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        value={true}
                                        onChange={() => {}}
                                        className="m-2"
                                        style={{
                                            height: "20px",
                                            width: "20px",
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Home>
    );
};

export default Attendance;
