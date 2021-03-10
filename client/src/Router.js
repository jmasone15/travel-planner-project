import React, { useContext, useState, useEffect } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import HomePage from "./components/pages/HomePage";
import Navbar from "./components/pages/Navbar";
import BudgetPage from "./components/pages/BudgetPage";
import AuthContext from "./context/AuthContext";
import UserContext from "./context/UserContext";
import Recommend from "./components/pages/Recommend";
import ReviewPage from "./components/pages/ReviewPage";
import ProfilePage from "./components/pages/ProfilePage";
import axios from "axios";
import UpdatePage from "./components/pages/UpdatePage";
import Wrapper from "./components/Wrapper";
import ItineraryPage from "./components/pages/ItineraryPage";

export default function Router() {
    const { loggedIn, getLoggedIn } = useContext(AuthContext);
    const { userId } = useContext(UserContext);
    const [tripBudget, setTripBudget] = useState(0);
    const [tripTripName, setTripTripName] = useState("");
    const [tripStartLocation, setTripStartLocation] = useState("");
    const [tripDestination, setTripDestination] = useState("");
    const [tripDates, setTripDates] = useState([]);
    const [updateId, setUpdateId] = useState("");

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
                                <Login />
                            </Route>
                            <Route path="/budget">
                                <Login />
                            </Route>
                            <Route path="/donde">
                                <Login />
                            </Route>
                            <Route path="/review">
                                <Login />
                            </Route>
                            <Route path="/profile">
                                <Login />
                            </Route>
                            <Route path="/update">
                                <Login />
                            </Route>
                            <Route path="/itinerary">
                                <Login />
                            </Route>
                        </>
                    )}
                    {loggedIn === true && (
                        <>
                            <Navbar />
                            <Route exact path="/">
                                <HomePage />
                            </Route>
                            <Route exact path="/signup">
                                <HomePage />
                            </Route>
                            <Route path="/home">
                                <HomePage
                                    setTripName={setTripTripName}
                                    setTripStartLocation={setTripStartLocation}
                                    setTripDestination={setTripDestination}
                                    setTripDates={setTripDates}
                                    setTripBudget={setTripBudget}
                                />
                            </Route>
                            <Route path="/budget">
                                <BudgetPage setTripBudget={setTripBudget} tripBudget={tripBudget} />
                            </Route>
                            <Route path="/donde">
                                <Recommend
                                    tripTripName={tripTripName}
                                    setTripTripName={setTripTripName}
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
                                    setTripName={setTripTripName}
                                    setTripStartLocation={setTripStartLocation}
                                    setTripDestination={setTripDestination}
                                    setTripDates={setTripDates}
                                    setTripBudget={setTripBudget}
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
                                <ItineraryPage />
                            </Route>
                        </>
                    )}
                </Switch>
            </BrowserRouter>
        </Wrapper>
    )
}