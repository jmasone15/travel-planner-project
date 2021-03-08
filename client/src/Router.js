import React, { useContext, useState } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/pages/Home";
import Navbar from "./components/pages/Navbar";
import BudgetPage from "./components/pages/BudgetPage";
import AuthContext from "./context/AuthContext";
import Recommend from "./components/pages/Recommend";
import ReviewPage from "./components/pages/ReviewPage";
import ProfilePage from "./components/pages/ProfilePage";

export default function Router() {
    const { loggedIn } = useContext(AuthContext);
    const [tripBudget, setTripBudget] = useState(0);
    const [tripTripName, setTripTripName] = useState("");
    const [tripStartLocation, setTripStartLocation] = useState("");
    const [tripDestination, setTripDestination] = useState("");
    const [tripDates, setTripDates] = useState([]);

    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                {loggedIn === false && (
                    <>
                        <Route exact path="/">
                            <Login />
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
                        <Route path="/recommend">
                            <Login />
                        </Route>
                        <Route path="/review">
                            <Login />
                        </Route>
                        <Route path="/profile">
                            <Login />
                        </Route>
                    </>
                )}
                {loggedIn === true && (
                    <>
                        <Route path="/home">
                            <Home
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
                        <Route path="/recommend">
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
                            <ProfilePage />
                        </Route>
                    </>
                )}
            </Switch>
        </BrowserRouter>
    )
}