import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from "../../context/UserContext";
import AuthContext from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

export default function Home(props) {

    const { userId } = useContext(UserContext);
    const { loggedIn } = useContext(AuthContext);
    const [userEmail, setUserEmail] = useState("");
    const history = useHistory();

    function handleBtn(e) {
        e.preventDefault(e);

        props.setTripName("");
        props.setTripBudget(0);
        props.setTripDestination("");
        props.setTripStartLocation("");
        props.setTripDates([]);

        if (loggedIn === true) {
            history.push("/budget");
        } else {
            history.push("/login")
        }
    }



    async function getUserData() {
        if (loggedIn === true) {
            const userData = await axios.get(`user/profile/${userId}`);
            setUserEmail(userData.data.email)
        } else {
            setUserEmail("No user logged in")
        }
    }

    useEffect(() => {

        getUserData()
    });

    return (
        <div>
            <h1>Travel Planner</h1>
            <p>Welcome: {userEmail}</p>
            <button onClick={(e) => handleBtn(e)}>Build your Trip</button>
        </div>
    )
}
