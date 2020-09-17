import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary ">
      <Link className="navbar-brand" to="/">
        <i className="fa fa-video-camera" aria-hidden="true"></i> Vidly
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarsExampleDefault"
        aria-controls="navbarsExampleDefault"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul className="navbar-nav mr-auto">
          <NavLink className="nav-item nav-link" to="/movies">
            <b>Movies</b>
          </NavLink>
          <NavLink className="nav-item nav-link" to="/customers">
            <b>Customers</b>
          </NavLink>
          <NavLink className="nav-item nav-link" to="/rentals">
            <b>Rentals</b>
          </NavLink>
        </ul>
        <Link
          style={{
            fontWeight: 500,
            color: "primary",
            borderWidth: 0,
          }}
          className="btn btn-outline-light d-none d-lg-inline-block mb-3 mb-md-0 ml-md-3"
          to="/login"
        >
          <i className="fa fa-sign-in fa-4" aria-hidden="true"></i> Login
        </Link>
        <Link
          style={{
            fontWeight: 500,
            color: "primary",
            borderWidth: 0,
          }}
          className="btn btn-outline-light d-none d-lg-inline-block mb-3 mb-md-0 ml-md-3"
          to="/register"
        >
          <i className="fa fa-user-plus" aria-hidden="true"></i> Register
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
