import React, { useState, useEffect } from "react";
import imgSrc from "../../../Assets/Images/האשכול3.png";
import "./Header.css";

function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`Header ${scrolled ? "scrolled" : ""}`}>
            <div className="Header-container">
                <img src={imgSrc} alt="logo" className="header-img" />

            </div>
        </div>
    );
}

export default Header;
