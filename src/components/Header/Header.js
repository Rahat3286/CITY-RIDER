import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className="container">
            <nav className="container navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/home" className="navbar-brand">
                    City Riders
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item ">
                            <Link to="/home" className="nav-link">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/destination" className="nav-link" >Destination</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/blog" className="nav-link" >Blog</Link>
                        </li>
                        <li to className="nav-item">
                            <Link to="/contact" className="nav-link">Contact</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link active">Login</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;