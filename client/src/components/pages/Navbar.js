import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Logout from "../auth/Logout";

export default function Navbar() {
    const { loggedIn } = useContext(AuthContext);

    return (
        <div>
            {loggedIn === false && (
                <>
                    <Link exact to="/">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </>
            )}
            {loggedIn === true && (
                <>
                    <Link to="/home">Home</Link>
                    <Link to="/budget">Budget</Link>
                    <Link to="/recommend">Destination</Link>
                    <Link to="/profile">Profile</Link>
                    <Logout />
                </>
            )}
        </div>
    )
}
