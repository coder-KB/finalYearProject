import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
    return (
        <div
            className="container bg-body text-primary mt-5 text-center"
            style={{ width: "800px" }}
        >
            <hr></hr>
            <h3>
                You have to &nbsp;
                <Link to="/signin">SignIn</Link>
                &nbsp;or&nbsp;
                <Link to="/signup">SignUp</Link>
                &nbsp;to View all functionalities.
            </h3>
            <br></br>
            <p className="lead">
                This application is build as an final year project in JSS
                Science and Technology University by a group of students.
            </p>
            <p className="lead">
                To get more details regarding this app,
                <span>
                    Visit our{" "}
                    <a
                        href="https://github.com/coder-KB/finalYearProject"
                        target="_blank"
                        rel="noreferrer"
                    >
                        github
                    </a>{" "}
                    page.
                </span>
            </p>

            <p className="lead">
                Also, If you want to know about our team, You can view that on
                About Us Page.
            </p>

            <p>
                Thank you for visiting our website{" "}
                <i class="fas fa-praying-hands"></i>.
            </p>
            <hr></hr>
        </div>
    );
};

export default Unauthorized;
