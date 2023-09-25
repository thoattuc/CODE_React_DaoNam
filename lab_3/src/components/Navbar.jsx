import { Link } from "react-router-dom";
import React from "react";

function Navbar(props) {
  if (!localStorage.getItem("token") || localStorage.getItem("token") == null) {
    window.location.replace("/login");
  }

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Niam
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/todo">
                  Todo
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categrories
                </Link>
                <ul className="dropdown-menu">
                  {props.brands &&
                    props.brands.map((item) => (
                      <li>
                        <a className="dropdown-item" href="#">
                          {item.name}
                        </a>
                      </li>
                    ))}
                </ul>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Brands
                </Link>
                <ul className="dropdown-menu">
                  {props.cates &&
                    props.cates.map((item) => (
                      <li>
                        <a className="dropdown-item" href="#">
                          {item.name}
                        </a>
                      </li>
                    ))}
                </ul>
              </li>

              <li className="nav-item">
                <Link className="nav-link" aria-disabled="true" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
