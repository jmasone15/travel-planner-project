import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import UserContext from "../../context/UserContext";
import AuthContext from "../../context/AuthContext";
import { useHistory } from "react-router-dom";

export default function ProfilePage() {
    const { userId } = useContext(UserContext);
    const { loggedIn } = useContext(AuthContext);
    const [profileEmail, setProfileEmail] = useState("");
    const [tripArray, setTripArray] = useState([]);
    const history = useHistory();

    async function getUserData() {
        if (loggedIn === true) {
            const userData = await axios.get(`user/profile/${userId}`);
            setProfileEmail(userData.data.email)
            const userTrips = await axios.get(`api/${userId}`)
            setTripArray(userTrips.data);
            console.log(userTrips.data)
        } else {
            setProfileEmail("No user logged in")
        }
    }

    async function removeTrip(e, id) {
        e.preventDefault();

        try {
            await axios.delete(`/api/${id}`);
            alert("Trip removed")
            window.location.reload();
        } catch (err) {
            console.error(err)
        }
    }

    function btnClick(e) {
        e.preventDefault();
        history.push("/budget")
    }

    useEffect(() => {
        getUserData()
    }, []);

    return (
        <div>
            <h1>{profileEmail}</h1>
            {tripArray.length === 0 &&

                <div style={{ marginTop: "150px", textAlign: "center" }}>
                    <h3>No Trips saved to your profile</h3>
                    <button onClick={(e) => btnClick(e)}>Build a new trip!</button>
                </div>
            }
            {
                tripArray.length !== 0 && tripArray.map((trip) => (
                    <div style={{ width: "500px", marginTop: "50px" }}>
                        <h3>Your trip to: {trip.destination}</h3>
                        <p>Trip Name: {trip.tripName}</p>
                        <p>Budget: {trip.budget}</p>
                        <p>Start Location: {trip.startLocation}</p>
                        <p>Dates:</p>
                        <ul>
                            {trip.dates.map((day) => (
                                <li>
                                    {day.name}
                                    <p>{day.activities.map((a) => (
                                        <p>Activity: {a}</p>
                                    ))}</p>
                                </li>
                            ))}
                        </ul>
                        <button onClick={(e) => removeTrip(e, trip._id)}>Remove Trip</button>
                    </div>
                ))
            }
        </div >
    )
}
