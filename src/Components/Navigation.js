import React from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../Utils/Fairbase";
import "./main.css";

function Navigation() {
  const onLogout = () => {
    auth
      .signOut()
      .then(() => localStorage.removeItem("user"), window.location.reload())
      .catch((err) => err);
  };

  

  return (
    <nav className="container mt-2 navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
      {localStorage.length > 0 ? (
        <div className="green"></div>
      ) : (
        <div className="red"></div>
      )}

      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Firebase
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="/auth"
              >
                Authentication
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to="/firestore"
              >
                Firestore
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {localStorage.length > 0 ? (
        <button
          onClick={onLogout}
          className="btn btn-outline-light btn-sm my-2 my-sm-0"
          type="submit"
        >
          LogOut
        </button>
      ) : (
        ""
      )}
    </nav>
  );
}

export default Navigation;
