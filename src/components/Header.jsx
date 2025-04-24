import React from "react";
import './Header.css'
import { Link } from "react-router";

const Header = () => {
    return (
        <header>
            <Link to="/"><h3>Book Club</h3></Link>
            <Link to="/new">Create New Post</Link>
        </header>
    );
}

export default Header;