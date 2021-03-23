import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router";
import "../../css/budget.css";
import { attractions, hotels, shopping, restaurants } from "../../routes/API"
import axios from "axios";
import UserContext from "../../context/UserContext";
import "../../css/itinerary.css"
import "./home.css";
import MyCard from '../Calendar/MyCard';

function ItineraryPage(props) {
    const { userId } = useContext(UserContext);
    const history = useHistory();
    const [showPDF, setShowPDF] = useState(false);
    const [showActs, setShowActs] = useState(false);

    async function getUserData() {
        const userData = await axios.get(`user/profile/${userId}`);
        props.setProfileEmail(userData.data.email)
    }

    async function getTripData() {
        const userTrips = await axios.get(`api/${userId}`)
        props.setTripArray(userTrips.data);
        console.log(userTrips.data)
    }

    async function getSelectedTrip(e, id) {
        const sTrip = await axios.get(`/api/trip/${id}`)
        props.setSelectedTrip(sTrip.data);
        setShowPDF(true);
        setShowActs(true);
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        const name = e.target.name
        switch (name) {
            case "attractions":
                props.setType(props.poiArray);
                props.setShowResults(true);
                break;
            case "hotels":
                props.setType(props.hotelsArray);

                props.setShowResults(true);
                break;
            case "shopping":
                props.setType(props.shoppingArray);
                props.setShowResults(true);
                break;
            case "restaurants":
                props.setType(props.restaurantsArray);
                props.setShowResults(true);
                break;
        }
    }

    function getPoi(where) {

        attractions(where).then((results) => {
            props.setPoiArray(results.data.results);
        })
    }

    function getHotels(where) {
        hotels(where).then((results) => {
            props.setHotelsArray(results.data.results);
        })
    }

    function getShop(where) {
        shopping(where).then((results) => {
            props.setShoppingArray(results.data.results);
        })
    }

    function getFood(where) {
        restaurants(where).then((results) => {
            props.setRestaurantsArray(results.data.results);
        })
    }

    async function changePage(e) {
        e.preventDefault();
        history.push("/pdf");
    }

    useEffect(() => {
        getUserData();
        getTripData();
        console.log(props.activitiesArray);
        if (props.selectedTrip.destination !== undefined) {
            getPoi(props.selectedTrip.destination)
            getHotels(props.selectedTrip.destination)
            getShop(props.selectedTrip.destination)
            getFood(props.selectedTrip.destination)
        }
    }, [props.selectedTrip, props.activitiesArray]);
    return (
        <div className="bgThis">
            <br />
            <div
                className="container shadow bg-light p-5 mt-3 col-lg-10"
            >
                <div className="">
                    <h1 className="text-center font">Itinerary</h1>
                    <div className="container shadow p-3 mb-3 mt-5 bg-white rounded">
                        <h3 className="text-center font">Which trip do you want to build out?</h3>
                        <div>
                            <ul>
                                {props.tripArray.map((trip) => (
                                    <li style={{ fontSize: "20px", marginBottom: "25px", cursor: "pointer" }} onClick={(e) => getSelectedTrip(e, trip._id)} key={trip._id}>Trip to: {trip.destination}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                {showActs ? <div className="">
                    <div className="container shadow p-3 mb-3 mt-5 bg-white rounded">
                        <div className="row">
                            <div className="col">
                                <div style={{ textAlign: "center", paddingBottom: "20px" }}>
                                    <h2 className="text-center font">Choose Activities!</h2>
                                    <button className="btn btn-warning" name="attractions" onClick={(e) => handleFormSubmit(e)}>Attractions</button>
                                    <br /><br />
                                    <button className="btn btn-danger" name="restaurants" onClick={(e) => handleFormSubmit(e)}>Restaurants</button>
                                    <br /><br />
                                    <button className="btn btn-secondary" name="shopping" onClick={(e) => handleFormSubmit(e)}>Shopping</button>
                                    <br /><br />
                                    <button className="btn btn-info" name="hotels" onClick={(e) => handleFormSubmit(e)}>Hotels</button>
                                </div>
                            </div>
                            <div className="col-lg-10">
                                <div style={{ width: "auto", height: "300px", overflow: "scroll", justifyContent: "center", display: "flex" }}>
                                    {props.showResults ? <MyCard data={props.type} activitiesArray={props.activitiesArray} setActivitiesArray={props.setActivitiesArray} /> : null}
                                </div>
                            </div>
                        </div>

                    </div>
                    <br />
                    <div style={{ textAlign: "center" }}>
                        {showPDF ? <button className="btn-lg btn-success mt-2 p-2 shadow" onClick={(e) => changePage(e)}>Generate PDF!</button> : ""}
                    </div>
                </div> : ""}
            </div>

        </div>
    )
}

export default ItineraryPage;
