import axios from 'axios';
import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { useHistory } from "react-router-dom";

export default function ReviewPage(props) {
    const { userId } = useContext(UserContext);
    const history = useHistory();

    async function saveTravelPlans(e) {
        e.preventDefault();

        try {
            const travelData = {
                tripName: props.tripTripName,
                budget: props.tripBudget,
                startLocation: props.tripStartLocation,
                destination: props.tripDestination,
                dates: JSON.parse(props.tripDates),
                userId: userId
            }
            await axios.post("/api/new", travelData);
            alert("Trip Added!")
            props.setTripName("");
            props.setTripBudget(0);
            props.setTripDestination("");
            props.setTripStartLocation("");
            props.setTripDates([]);
            history.push("/home");

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h1>Review your trip</h1>
            <h4>Trip name: {props.tripTripName}</h4>
            <h4>Trip Budget: {props.tripBudget}</h4>
            <h4>Trip Start Location: {props.tripStartLocation}</h4>
            <h4>Trip Destination: {props.tripDestination}</h4>
            <h4>Trip Dates: {props.tripDates}</h4>
            <button onClick={(e) => saveTravelPlans(e)}>Submit Trip!</button>
        </div>
    )
}
