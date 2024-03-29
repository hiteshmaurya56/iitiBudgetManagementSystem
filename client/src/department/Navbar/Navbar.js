import React from "react";
import { ToastContainer } from "react-toastify";
import "./navbar.css";
import logo from "../../assets/images/iitindorelogo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        style={{ fontSize: "1.5em" }}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <header>
        <nav className="navbar navbar-expand-lg custom-navbar">
          <div className="container-fluid">
            <div className="container2">
              <Link className="navbar-brand" to="/">
                <img
                  src={logo}
                  alt="Logo"
                  width="60"
                  className="d-inline-block align-text-top"
                />
              </Link>
              <h5 className="nav-title">Budget Allocation IIT Indore</h5>
            </div>

            <div className="justify-content-between">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="/navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">
                      Home |
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="/"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Select year
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/">
                          2022
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/">
                          2023
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="/"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Manage Users
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/">
                          Add new dept
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/">
                          Remove existing dept
                        </Link>
                      </li>
                      <hr className="dropdown-divider" />
                      <li>
                        <Link className="dropdown-item" to="/">
                          Add new user
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/">
                          Remove existing user
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="/"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Budget Controls
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/">
                          Increase Allocated Budget
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/">
                          Reset Financial Year
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/login">
                      Log in
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
