import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Logout from "../auth/Logout";
import { useHistory } from "react-router";
import axios from "axios";
import "../../css/navbar.css"

export default function Navbar() {
  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  const history = useHistory();

  async function logOut() {
    await axios.get("/user/logout");
    await getLoggedIn();
    history.push("/");
  }

  const nav = {
    background: "#EAC0A2",
  };

  return (
    <nav style={nav} className="navbar navbar-expand-lg navbar-dark p-3">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNavAltMarkup"
      > */}
        <div className="navbar-nav collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          {loggedIn === false && (
            <Link className="navbar-brand" to="/">
              ¿login | signup?
            </Link>
          )}
          {loggedIn === true && (
            <div className="navbar-nav">
              <ul className="navbar-nav">
                <li className="nav-item nav-link">
                  <Link to="/home" className="nav-link active navLinks">
                    ¿home?
                  </Link>
                </li>
                <li className="nav-item nav-link">
                  <Link to="/profile" className="nav-link active navLinks">
                    ¿profile?
                  </Link>
                </li>
                <li className="nav-item nav-link">
                  <Link className="nav-link active navLinks" onClick={(e) => logOut(e)}>
                    ¿logout?
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      {/* </div> */}
    </nav>
  );
}
