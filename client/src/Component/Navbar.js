import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light bg-transparent">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">OLD IS GOLD</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink exact className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/inquiry">Inquiry</NavLink>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">Logout</NavLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signin">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/signup">Registration</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
