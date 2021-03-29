import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router";
import "../../css/budget.css";
import axios from "axios";
import UserContext from "../../context/UserContext";
import "../../css/itinerary.css"
import "./home.css";
import MyCard from '../Calendar/MyCard';

function ItineraryPage(props) {
    const { userId } = useContext(UserContext);
    const history = useHistory();
    const [showActs, setShowActs] = useState(false);
    const [currentTrip, setCurrentTrip] = useState("");
    const [currentAct, setCurrentAct] = useState("attractions");

    async function getUserData() {
        const userData = await axios.get(`user/profile/${userId}`);
        props.setProfileEmail(userData.data.email)
    }

    async function getTripData() {
        const userTrips = await axios.get(`/api/${userId}`)
        props.setTripArray(userTrips.data);
    }

    async function getSelectedTrip(e, id, place) {
        e.preventDefault();
        const sTrip = await axios.get(`/api/trip/${id}`);
        props.setSelectedTrip(sTrip.data);
        setCurrentTrip(place);
        setShowActs(true);
        props.setType(props.poiArray);
        props.setShowResults(true);
    }

    async function resetPage(e) {
        e.preventDefault();
        setShowActs(false);
        setCurrentTrip("");
        props.setActivitiesArray([]);
        props.setNewActivity({});
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        const name = e.target.name
        switch (name) {
            case "hotels":
                props.setType(props.hotelsArray);
                props.setShowResults(true);
                setCurrentAct("hotels");
                break;
            case "shopping":
                props.setType(props.shoppingArray);
                props.setShowResults(true);
                setCurrentAct("shopping");
                break;
            case "restaurants":
                props.setType(props.restaurantsArray);
                props.setShowResults(true);
                setCurrentAct("restaurants");
                break;
            default:
                props.setType(props.poiArray);
                props.setShowResults(true);
                setCurrentAct("attractions");
                break;
        }
    }

    function getPoi(where) {

        axios.get(`/google/attractions/${where}`).then((results) => {
            props.setPoiArray(results.data.results);
        })
    }

    function getHotels(where) {
        axios.get(`/google/hotels/${where}`).then((results) => {
            props.setHotelsArray(results.data.results);
        })
    }

    function getShop(where) {
        axios.get(`/google/shopping/${where}`).then((results) => {
            props.setShoppingArray(results.data.results);
        })
    }

    function getFood(where) {
        axios.get(`/google/restaurants/${where}`).then((results) => {
            props.setRestaurantsArray(results.data.results);
        })
    }

    async function changePage(e) {
        e.preventDefault();
        history.push("/pdf");
    }

    useEffect(() => {
        if (props.selectedTrip.destination !== undefined) {
            getPoi(props.selectedTrip.destination)
            getHotels(props.selectedTrip.destination)
            getShop(props.selectedTrip.destination)
            getFood(props.selectedTrip.destination)
        }
        //eslint-disable-next-line
    }, [props.selectedTrip, props.activitiesArray]);

    useEffect(() => {
        getUserData();
        getTripData();
        //eslint-disable-next-line
    }, [userId]);

    return (
        <div className="bgThis">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-4">
                        <div className="container">
                            <div className="row">
                                {!showActs ?
                                    <div className="col shadow p-3 mb-3 mt-5 bg-white rounded" style={{ textAlign: "center" }}>
                                        <h3 className="text-center font">Choose a trip:</h3>
                                        {props.tripArray.map((trip) => (
                                            <p style={{ fontSize: "20px", cursor: "pointer" }} onClick={(e) => getSelectedTrip(e, trip._id, trip.destination)} key={trip._id}>{trip.destination}</p>
                                        ))}
                                    </div>
                                    : <div className="col shadow p-3 mb-3 mt-5 bg-white rounded" style={{ textAlign: "center" }}>
                                        <h3 className="text-center font">{currentTrip}</h3>
                                        <hr />
                                        <div>
                                            <h3 className="font">Activities:</h3>
                                            {props.activitiesArray.map((act) => (
                                                <p style={{ fontSize: "17px", cursor: "pointer" }}>{act.name}</p>
                                            ))}
                                            <hr />
                                        </div>
                                        <button className="btn-lg btn-success mb-2 mr-3 p-2 shadow" onClick={(e) => changePage(e)}>Generate PDF!</button>
                                        <button className="btn-lg btn-danger mb-2 p-2 shadow" onClick={(e) => resetPage(e)}>Restart</button>
                                    </div>
                                }
                            </div>
                            {/* {showActs ?
                                <div className="row">
                                    <div class="col shadow p-3 mb-3 mt-5 bg-white rounded" style={{ textAlign: "center" }}>
                                        <h3 className="text-center font">Your Selected Activities</h3>
                                        {props.activitiesArray.map((act) => (
                                            <p style={{ fontSize: "17px", cursor: "pointer" }}>{act.name}</p>
                                        ))}
                                    </div>
                                </div>
                                : ""} */}
                        </div>
                    </div>
                    <div className="col-8">
                        {showActs ? <div className="">
                            <div className="container shadow p-3 mb-3 mt-5 bg-white rounded">
                                <div className="row">
                                    <div style={{ textAlign: "center", paddingBottom: "20px" }}>
                                        {currentAct === "attractions" ? <button className="btn btn-success" name="attractions" style={{ margin: "10px" }} onClick={(e) => handleFormSubmit(e)}>Attractions</button>
                                            : <button className="btn btn-secondary" name="attractions" style={{ margin: "10px" }} onClick={(e) => handleFormSubmit(e)}>Attractions</button>}
                                        {currentAct === "restaurants" ? <button className="btn btn-success" name="restaurants" style={{ margin: "10px" }} onClick={(e) => handleFormSubmit(e)}>Restaurants</button>
                                            : <button className="btn btn-secondary" name="restaurants" style={{ margin: "10px" }} onClick={(e) => handleFormSubmit(e)}>Restaurants</button>}
                                        {currentAct === "shopping" ? <button className="btn btn-success" name="shopping" style={{ margin: "10px" }} onClick={(e) => handleFormSubmit(e)}>Shopping</button>
                                            : <button className="btn btn-secondary" name="shopping" style={{ margin: "10px" }} onClick={(e) => handleFormSubmit(e)}>Shopping</button>}
                                        {currentAct === "hotels" ? <button className="btn btn-success" name="hotels" style={{ margin: "10px" }} onClick={(e) => handleFormSubmit(e)}>Hotels</button>
                                            : <button className="btn btn-secondary" name="hotels" style={{ margin: "10px" }} onClick={(e) => handleFormSubmit(e)}>Hotels</button>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div>
                                        {props.showResults ? <MyCard data={props.type} activitiesArray={props.activitiesArray} setActivitiesArray={props.setActivitiesArray} newActivity={props.newActivity} setNewActivity={props.setNewActivity} /> : null}
                                    </div>
                                </div>
                            </div>
                            <br />
                        </div> : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ItineraryPage;
