import axios from 'axios';
import React, { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { useHistory } from "react-router-dom";

export default function ReviewPage(props) {
    const { userId } = useContext(UserContext);
    const history = useHistory();

    function getDateRange(x) {
        let result = x.map(date => date.name)
        return (`${result[0]} - ${result[result.length - 1]}`)
    }

    function changePage(e) {
        e.preventDefault();
        history.push("/budget")
    }

    async function saveTravelPlans(e) {
        e.preventDefault();
        console.log(props.tripExpenses);

        try {
            const travelData = {
                tripName: props.tripTripName,
                budget: props.tripBudget,
                expenses: JSON.parse(props.tripExpenses),
                startLocation: props.tripStartLocation,
                destination: props.tripDestination,
                dates: props.tripDates,
                userId: userId
            }
            await axios.post("/api/new", travelData);
            alert("Trip Added!")
            props.setTripName("");
            props.setTripBudget(0);
            props.setTripDestination("");
            props.setTripStartLocation("");
            props.setTripDates([]);
            props.setTripExpenses([]);
            history.push("/profile");

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="bgThis">
            <br /><br />
            <div className="container shadow bg-light p-5 mt-3 col-lg-10" style={{ width: "500px", marginTop: "50px" }}>
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
            <br />
        </div>
    )
}
