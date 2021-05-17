import React from "react";
import "./AboutOne.css";

const AboutOne = ({ user }) => {
    return (
        <div className="Card text-center text-bold">
            <div className="Card-Header">{user.name}</div>
            <div className="Card-Header">{user.usn}</div>
            <div className="Card-details">{user.info}</div>
            <div className="Card-Img">
                <img src={user.image} alt={user.name} />
            </div>
            <div className="Interests">
                Hobby <span className="Interest">{user.hobby}</span>
            </div>
            <div className="Card-Link">
                {user.github && (
                    <a href={user.github} target="_blank" rel="noreferrer">
                        <i className="fab fa-github"></i>
                    </a>
                )}
                {user.linkedin && (
                    <a href={user.linkedin} target="_blank" rel="noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                )}
            </div>
        </div>
    );
};

export default AboutOne;
