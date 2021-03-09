import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function UpdatePage(props) {

    const [updateName, setUpdateName] = useState("");
    const [updateId, setUpdateId] = useState("");
    const [updateBudget, setUpdateBudget] = useState("");
    const [updateStartLocation, setUpdateStartLocation] = useState("");
    const [updateDestination, setUpdateDestination] = useState("");
    // const [updateDates, setUpdateDates] = useState("");
    const history = useHistory();

    async function getTripData() {
        const userTrip = await axios.get(`/api/trip/${props.updateId}`)
        console.log(userTrip.data)

        setUpdateId(userTrip.data._id)
        setUpdateName(userTrip.data.tripName);
        setUpdateBudget(userTrip.data.budget);
        setUpdateStartLocation(userTrip.data.startLocation);
        setUpdateDestination(userTrip.data.destination);
    }

    async function updateTripData(e) {
        e.preventDefault();

        try {
            await axios.put(`/api/update/${updateId}`, {
                tripName: updateName,
                budget: updateBudget,
                startLocation: updateStartLocation,
                destination: updateDestination
            });
            alert("Trip Updated");
            history.push("/profile")
        } catch (err) {
            console.error(err)
        }

    }

    useEffect(() => {
        getTripData()
    }, []);

    return (
        <div>
            <h1>Update Page</h1>
            <form>
                <label>Trip Name: </label>
                <input type="text" value={updateName} onChange={(e) => setUpdateName(e.target.value)} />
                <br />
                <label>Budget: </label>
                <input type="text" value={updateBudget} onChange={(e) => setUpdateBudget(e.target.value)} />
                <br />
                <label>Start Location: </label>
                <input type="text" value={updateStartLocation} onChange={(e) => setUpdateStartLocation(e.target.value)} />
                <br />
                <label>Destination: </label>
                <input type="text" value={updateDestination} onChange={(e) => setUpdateDestination(e.target.value)} />
                <br />
                <button onClick={(e) => updateTripData(e)}>Submit Changes</button>
            </form>


        </div>
    )
}
