import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from "../../context/UserContext";
import AuthContext from "../../context/AuthContext";

export default function Home() {

    const { userId } = useContext(UserContext);
    const { loggedIn } = useContext(AuthContext);
    const [userEmail, setUserEmail] = useState("");

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
        </div>
    )
}
