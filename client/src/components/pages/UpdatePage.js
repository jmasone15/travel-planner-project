import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import SearchBar from "../Calendar/Autocomplete";
import Calender from '../Calendar/Calender';

export default function UpdatePage(props) {

    const [updateName, setUpdateName] = useState("");
    const [updateId, setUpdateId] = useState("");
    const [updateBudget, setUpdateBudget] = useState("");
    const [updateStartLocation, setUpdateStartLocation] = useState("");
    const [updateDestination, setUpdateDestination] = useState("");
    const [updateStartDate, setUpdateStartDate] = useState(null);
    const [updateEndDate, setUpdateEndDate] = useState(null);
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


    function dateRange() {
        if ((updateStartDate !== null) && (updateEndDate !== null)) {

            var getDaysBetweenDates = () => {
              var now = updateStartDate.clone(), dates = [];
      
              while (now.isSameOrBefore(updateEndDate)) {
                dates.push(now.format('MM/DD/YYYY'));
                now.add(1, 'days');
              }
              return (dates);
            }
      
            
      
            let myDates = getDaysBetweenDates()
            let array = []
      
            for (let i = 0; i < myDates.length; ++i) {
              let eachDay = {
                name: myDates[i],
                activities: []
              };
              array.push(eachDay)
            }
            return array;
        }
    }

    async function updateTripData(e) {
        e.preventDefault();

        

        try {
            const newDates = await dateRange();
            console.log(newDates);
            await axios.put(`/api/update/${updateId}`, {
                tripName: updateName,
                budget: updateBudget,
                startLocation: updateStartLocation,
                destination: updateDestination,
                dates: newDates
            });
            alert("Trip Updated");
            history.push("/profile");
        } catch (err) {
            console.error(err)
        }

    }

    function changePage(e) {
        e.preventDefault();
        history.push("/profile")
    }

    useEffect(() => {
        getTripData()
    }, []);

    return (
        <div className="bgThis p-5">
            <div style={{ textAlign: "center" }}>
                <h1>Update Your Trip</h1>
            </div>
            <br />
            <div className="container shadow bg-light p-5 mt-3 col-lg-10" style={{ textAlign: "center", width: "600px", marginTop: "50px" }}>
                <form >
                    <label><b>Trip name</b></label>
                    <br />
                    <input type="text" className="updateInput" value={updateName} onChange={(e) => setUpdateName(e.target.value)} />
                    <br /><br />
                    <label><b>Budget</b></label>
                    <br />
                    <input type="text" className="updateInput" value={updateBudget} onChange={(e) => setUpdateBudget(e.target.value)} />
                    <br /><br />
                    <label><b>Start Location</b></label>
                    <br />
                    {/* <input type="text" className="updateInput" value={updateStartLocation} onChange={(e) => setUpdateStartLocation(e.target.value)} /> */}
                    <SearchBar type="text" value={updateStartLocation} placeholder={updateStartLocation} className="updateStart" setUpdateStartLocation={setUpdateStartLocation} />
                    <br /><br />
                    <label><b>Destination</b></label>
                    <br />
                    {/* <input type="text" className="updateInput" value={updateDestination} onChange={(e) => setUpdateDestination(e.target.value)} /> */}
                    <SearchBar type="text" value={updateDestination} placeholder={updateDestination} className="updateDestination" setUpdateDestination={setUpdateDestination} />
                    <br /><br />
                    <Calender startDate={updateStartDate} endDate={updateEndDate} setEndDate={setUpdateEndDate} setStartDate={setUpdateStartDate} />
                    <button className="btn btn-block btn-success mt-2 p-2 shadow" onClick={(e) => updateTripData(e)}>Submit Changes</button>
                    <button className="btn btn-block btn-danger mt-2 p-2 shadow" onClick={(e) => changePage(e)}>Go Back</button>
                </form>
            </div>

        </div>
    )
}
