import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router";
import "../../css/budget.css";
import Card from "../Card";
import axios from "axios";
import UserContext from "../../context/UserContext";

function ItineraryPage() {
    const history = useHistory();
    const { userId } = useContext(UserContext);
    const [tripArray, setTripArray] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState({});
    const [showPDF, setShowPDF] = useState(false);
    const [showActs, setShowActs] = useState(false);
    const [profileEmail, setProfileEmail] = useState("");

    async function getUserData() {
        const userData = await axios.get(`user/profile/${userId}`);
        setProfileEmail(userData.data.email)
    }

    async function getTripData() {
        const userTrips = await axios.get(`api/${userId}`)
        setTripArray(userTrips.data);
        console.log(userTrips.data)
    }

    async function getSelectedTrip(e, id) {
        const sTrip = await axios.get(`/api/trip/${id}`)
        setSelectedTrip(sTrip.data);
        setShowPDF(true);
        setShowActs(true);
    }

    async function changePage(e) {
        e.preventDefault();

        history.push("/pdf");
    }

    useEffect(() => {
        getUserData();
        getTripData();
    }, []);
    return (
        <div className="bg">
            <div
                className="card shadow p-3 mb-5 bg-white rounded"
            >
                <div className="card-body">
                    <h1 className="text-center font">Itinerary</h1>
                    <Card style={{ backgroundColor: "#E0E1CC" }}>
                        <h5 className="p">Which trip do you want to build out?</h5>
                        <div>
                            <ul>
                                {tripArray.map((trip) => (
                                    <li className="p" onClick={(e) => getSelectedTrip(e, trip._id)} key={trip._id}>Trip to: {trip.destination}</li>
                                ))}
                            </ul>
                        </div>
                    </Card>
                </div>
                {showActs ? <div className="card-body">
                    <Card style={{ backgroundColor: "#E0E1CC" }}>
                        <div style={{ textAlign: "center" }}>
                            <h3 className="text-center font">Activities in your destination area!</h3>
                            <button>Activities</button><button>Restaurant</button><button>Entertainment</button><button>Night Life</button>
                        </div>
                        <div>
                            <ul>
                                <li className="p">Activity</li>
                                <li className="p">Activity</li>
                                <li className="p">Activity</li>
                            </ul>
                        </div>

                    </Card>
                </div> : ""}
            </div>
            {showPDF ? <button onClick={(e) => changePage(e)}>Generate PDF!</button> : ""}
        </div>
    )
}

export default ItineraryPage;
