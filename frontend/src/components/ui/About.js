import React from "react";
import Home from "../Home";
import AboutOne from "./AboutOne";
import BharathImage from "../../images/bharath.png";
import RaghunathImage from "../../images/raghunath.jpeg";
import KshitijImage from "../../images/kshitij.jpeg";
import SanjayImage from "../../images/sanjay.jpeg";

const About = () => {
    const us = [
        {
            name: "Bharath Choudhary",
            image: BharathImage,
            usn: "01JST17CS033",
            info: "I am Software Engineer at Cisco, I am interested in Competitve   Programming",
            hobby: "BasketBall",
            linkedin: "https://www.linkedin.com/in/bharath-choudhary-2196bb175",
            github: "https://github.com/coder-KB/",
        },
        {
            name: "Raghunath Deshpande",
            image: RaghunathImage,
            usn: "01JST17CS111",
            info: "I am working as AEM developer at Informatica",
            hobby: "BasketBall",
            linkedin:
                "https://www.linkedin.com/in/raghunath-deshpande-b06589192/",
            github: " https://github.com/raghu761",
        },
        {
            name: "Kshitij Birde",
            image: KshitijImage,
            usn: "01JST17CS074",
            info: "I am very interested in exploring new things",
            hobby: "BasketBall",
        },
        {
            name: "Sanjay K R",
            image: SanjayImage,
            usn: "01JST17CS139",
            info: "I am working as Developer at TCS. I'm interested in web designing",
            hobby: "Chess",
        },
    ];

    return (
        <Home>
            <div className="container mt-5">
                <div className="row">
                    {us.map((user, idx) => {
                        return (
                            <div className="col-6" key={idx}>
                                <AboutOne user={user} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </Home>
    );
};

export default About;
