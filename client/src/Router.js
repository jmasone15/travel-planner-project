import React, { useContext, useState, useEffect } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import HomePage from "./components/pages/HomePage";
import Navbar from "./components/pages/Navbar";
import BudgetPage from "./components/pages/BudgetPage";
import AuthContext from "./context/AuthContext";
import Recommend from "./components/pages/Recommend";
import ReviewPage from "./components/pages/ReviewPage";
import ProfilePage from "./components/pages/ProfilePage";
import UpdatePage from "./components/pages/UpdatePage";
import Wrapper from "./components/Wrapper";
import Itinerary from "./components/pages/Itinerary";
import ItineraryPage from "./components/pages/ItineraryPage";

export default function Router() {
    const { loggedIn, getLoggedIn } = useContext(AuthContext);
    const [tripBudget, setTripBudget] = useState(0);
    const [tripExpenses, setTripExpenses] = useState("");
    const [tripTripName, setTripTripName] = useState("");
    const [tripStartLocation, setTripStartLocation] = useState("");
    const [tripDestination, setTripDestination] = useState("");
    const [tripDates, setTripDates] = useState([]);
    const [updateId, setUpdateId] = useState("");
    const [tripArray, setTripArray] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState({});
    const [activitiesArray, setActivitiesArray] = useState([])
    const [profileEmail, setProfileEmail] = useState("");
    const [showResults, setShowResults] = useState()
    const [type, setType] = useState([])
    const [poiArray, setPoiArray] = useState([])
    const [hotelsArray, setHotelsArray] = useState([])
    const [shoppingArray, setShoppingArray] = useState([])
    const [restaurantsArray, setRestaurantsArray] = useState([])

    return (
        <Wrapper>
            <BrowserRouter>
                <Switch>
                    {loggedIn === false && (
                        <>
                            <Route exact path="/">
                                <Login loggedIn={loggedIn} getLoggedIn={getLoggedIn} />
                            </Route>
                            <Route path="/signup">
                                <Signup />
                            </Route>
                            <Route path="/home">
                                <Redirect to="/" />
                            </Route>
                            <Route path="/budget">
                                <Redirect to="/" />
                            </Route>
                            <Route path="/donde">
                                <Redirect to="/" />
                            </Route>
                            <Route path="/review">
                                <Redirect to="/" />
                            </Route>
                            <Route path="/profile">
                                <Redirect to="/" />
                            </Route>
                            <Route path="/update">
                                <Redirect to="/" />
                            </Route>
                            <Route path="/itinerary">
                                <Redirect to="/" />
                            </Route>
                        </>
                    )}
                    {loggedIn === true && (
                        <>
                            <Navbar />
                            <Route exact path="/">
                                <Redirect to="/home" />
                            </Route>
                            <Route exact path="/signup">
                                <Redirect to="/home" />
                            </Route>
                            <Route path="/home">
                                <HomePage setTripBudget={setTripBudget} />
                            </Route>
                            <Route path="/budget">
                                <BudgetPage
                                    setTripBudget={setTripBudget}
                                    tripBudget={tripBudget}
                                    tripExpenses={tripExpenses}
                                    setTripExpenses={setTripExpenses}
                                    setTripName={setTripTripName}
                                    setTripStartLocation={setTripStartLocation}
                                    setTripDestination={setTripDestination}
                                    setTripDates={setTripDates} />
                            </Route>
                            <Route path="/donde">
                                <Recommend
                                    tripStartLocation={tripStartLocation}
                                    setTripStartLocation={setTripStartLocation}
                                    tripDestination={tripDestination}
                                    setTripDestination={setTripDestination}
                                    tripDates={tripDates}
                                    setTripDates={setTripDates}
                                />
                            </Route>
                            <Route path="/review">
                                <ReviewPage
                                    tripTripName={tripTripName}
                                    tripStartLocation={tripStartLocation}
                                    tripDestination={tripDestination}
                                    tripDates={tripDates}
                                    tripBudget={tripBudget}
                                    tripExpenses={tripExpenses}
                                    setTripName={setTripTripName}
                                    setTripStartLocation={setTripStartLocation}
                                    setTripDestination={setTripDestination}
                                    setTripDates={setTripDates}
                                    setTripBudget={setTripBudget}
                                    setTripExpenses={setTripExpenses}
                                />
                            </Route>
                            <Route path="/profile">
                                <ProfilePage
                                    updateId={updateId}
                                    setUpdateId={setUpdateId} />
                            </Route>
                            <Route path="/update">
                                <UpdatePage
                                    updateId={updateId}
                                    setUpdateId={setUpdateId}
                                />
                            </Route>
                            <Route path="/itinerary">
                                <ItineraryPage
                                    tripArray={tripArray}
                                    selectedTrip={selectedTrip}
                                    activitiesArray={activitiesArray}
                                    profileEmail={profileEmail}
                                    showResults={showResults}
                                    type={type}
                                    poiArray={poiArray}
                                    hotelsArray={hotelsArray}
                                    shoppingArray={shoppingArray}
                                    restaurantsArray={restaurantsArray}
                                    setTripArray={setTripArray}
                                    setSelectedTrip={setSelectedTrip}
                                    setActivitiesArray={setActivitiesArray}
                                    setProfileEmail={setProfileEmail}
                                    setShowResults={setShowResults}
                                    setType={setType}
                                    setPoiArray={setPoiArray}
                                    setHotelsArray={setHotelsArray}
                                    setShoppingArray={setShoppingArray}
                                    setRestaurantsArray={setRestaurantsArray}
                                />
                            </Route>
                            <Route path="/pdf">
                                <Itinerary
                                    tripArray={tripArray}
                                    selectedTrip={selectedTrip}
                                    activitiesArray={activitiesArray}
                                    profileEmail={profileEmail}
                                />
                            </Route>
                        </>
                    )}
                </Switch>
            </BrowserRouter>
        </Wrapper>
    )
}