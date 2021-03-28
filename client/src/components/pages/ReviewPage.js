import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../context/UserContext';
import { useHistory } from "react-router-dom";
import { set } from 'mongoose';

export default function ReviewPage(props) {
    const { userId } = useContext(UserContext);
    const [showTripData, setShowTripData] = useState(false);
    const [profileEmail, setProfileEmail] = useState("");
    const history = useHistory();

    function getDateRange(x) {
        let result = x.map(date => date.name)
        return (`${result[0]} - ${result[result.length - 1]}`)
    }

    

    function reviewTrip(e) {
        e.preventDefault();
        setShowTripData(true);
    }

    function changePage(e) {
        e.preventDefault();
        history.push("/budget")
    }

    async function saveTravelPlans(e) {
        e.preventDefault();
        console.log(props.destinationPicture);
        

        try {
            const travelData = {
                tripName: props.tripTripName,
                budget: props.tripBudget,
                pic: props.destinationPicture,
                expenses: JSON.parse(props.tripExpenses),
                startLocation: props.tripStartLocation,
                destination: props.tripDestination,
                dates: props.tripDates,
                userId: userId,
                email: profileEmail
            }
            await axios.post("/api/new", travelData);
            alert("Trip Added!")
            props.setTripName("");
            props.setTripBudget(0);
            props.setDestinationPicture("")
            props.setTripDestination("");
            props.setTripStartLocation("");
            props.setTripDates([]);
            props.setTripExpenses([]);
            setProfileEmail("");
            history.push("/profile");

        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        const getUserData = async () => {
            const userData = await axios.get(`user/profile/${userId}`);
            setProfileEmail(userData.data.email)
        }
        getUserData()
    }, []);

    return (
        <div className="bgThis">
            <br />
            <div className="container shadow bg-light p-5 mt-3 col-lg-10" style={{ width: "500px", marginTop: "50px" }}>
                <form>
                    <label>Name your trip:</label>
                    <input type="text" placeholder="My Super Amazing Trip!" value={props.tripTripName} onChange={(e) => props.setTripName(e.target.value)} />
                    <button className="btn btn-secondary mt-2 p-2 shadow" onClick={(e) => reviewTrip(e)} >Review Trip</button>
                </form>
            </div>
            <br /><br />
            {showTripData ?
                <div className="container shadow bg-light p-5 mt-3 col-lg-10" style={{ width: "500px", marginTop: "50px" }}>
                    {props.destinationPicture ?
                                <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${props.destinationPicture}&sensor=false&maxheight=250&maxwidth=250&key=AIzaSyCoiYtN7Xjb7P4JIpWRtlMiL9uQirs_icI`} />
                                : null}
                    <h3><b>Your Trip to:</b> {props.tripDestination}</h3>
                    <br />
                    <p><b>Trip name:</b> {props.tripTripName}</p>
                    <p><b>Budget:</b> {props.tripBudget}</p>
                    <p><b>Start Location: </b> {props.tripStartLocation}</p>
                    <p><b>Dates:</b> {getDateRange(props.tripDates)}</p>
                    <br />
                    <button className="btn btn-block btn-success mt-2 p-2 shadow" onClick={(e) => saveTravelPlans(e)}>Save Trip!</button>
                    <button className="btn btn-block btn-danger mt-2 p-2 shadow" onClick={(e) => changePage(e)}>Restart Trip</button>
                </div>
                : ""}
            <br />
        </div>
    )
}
