import React from 'react';
import { Link } from 'react-router-dom';
import classList from './Navbar.module.scss';

function Navbar() {
    return (
        <div className={classList.navbar}>
            <nav>
                <Link to="/posts">Posts</Link>
                <Link to="/about">About</Link>
            </nav>
        </div>
    );
}

export default Navbar;
