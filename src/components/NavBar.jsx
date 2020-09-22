import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
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

        {user && (
          <React.Fragment>
            <Link
              className="btn btn-login d-none d-lg-inline-block mb-2 mb-md-0 ml-md-2"
              to="/profile"
            >
              <i className="fa fa-user-circle-o fa-4" aria-hidden="true"></i>{" "}
              {user.name}
            </Link>
            <Link
              style={{
                fontWeight: 500,
                borderWidth: 0,
              }}
              className="btn btn-login d-none d-lg-inline-block mb-2 mb-md-0 ml-md-2"
              to="/logout"
            >
              <i className="fa fa-sign-out fa-4" aria-hidden="true"></i> Logout
            </Link>
          </React.Fragment>
        )}

        {!user && (
          <React.Fragment>
            <Link
              style={{
                fontWeight: 500,
                color: "primary",
                borderWidth: 0,
              }}
              className="btn btn-login d-none d-lg-inline-block mb-2 mb-md-0 ml-md-2"
              to="/register"
            >
              <i className="fa fa-user-plus" aria-hidden="true"></i> Register
            </Link>
            <Link
              style={{
                fontWeight: 500,
                color: "primary",
                borderWidth: 0,
              }}
              className="btn btn-login d-none d-lg-inline-block mb-2 mb-md-0 ml-md-2"
              to="/login"
            >
              <i className="fa fa-sign-in fa-4" aria-hidden="true"></i> Login
            </Link>
          </React.Fragment>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
