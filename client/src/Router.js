import React, { useContext, useState } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Loadable from 'react-loadable';
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Navbar from "./components/pages/Navbar";
import AuthContext from "./context/AuthContext";
import Recommend from "./components/pages/Recommend";
import ReviewPage from "./components/pages/ReviewPage";
import ProfilePage from "./components/pages/ProfilePage";
import UpdatePage from "./components/pages/UpdatePage";
import Wrapper from "./components/Wrapper";
import Itinerary from "./components/pages/Itinerary";
import ItineraryPage from "./components/pages/ItineraryPage";
import Forgot from "./components/pages/Forgot";
import ResetPass from "./components/pages/ResetPass";
import bgBlue from "./images/bgBlue.png"

const HomePage = Loadable({
    loader: () => import('./components/pages/HomePage'),
    loading: () => <div>Loading...</div>
});

const BudgetPage = Loadable({
    loader: () => import('./components/pages/BudgetPage'),
    loading: () => <img src={bgBlue} />
});

const Recommend = Loadable({
    loader: () => import('./components/pages/Recommend'),
    loading: () => <div>Loading...</div>
});


const ReviewPage = Loadable({
    loader: () => import('./components/pages/ReviewPage'),
    loading: () => <div>Loading...</div>
});


const ProfilePage = Loadable({
    loader: () => import('./components/pages/ProfilePage'),
    loading: () => <div>Loading...</div>
});

const UpdatePage = Loadable({
    loader: () => import('./components/pages/UpdatePage'),
    loading: () => <div>Loading...</div>
});

const Wrapper = Loadable({
    loader: () => import('./components/Wrapper'),
    loading: () => <div>Loading...</div>
});

const Itinerary = Loadable({
    loader: () => import('./components/pages/Itinerary'),
    loading: () => <div>Loading...</div>
});

const ItineraryPage = Loadable({
    loader: () => import('./components/pages/ItineraryPage'),
    loading: () => <div>Loading...</div>
});


//   const BudgetPage = Loadable({
//     loader: () => import('./components/pages/BudgetPage'),
//     loading: () => <div>Loading...</div>
//   });

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
    const [destinationPicture, setDestinationPicture] = useState("");
    const [newActivity, setNewActivity] = useState(null);

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
                            <Route path="/forgot">
                                <Forgot />
                            </Route>
                            <Route path="/reset/:token">
                                <ResetPass />
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
                                    destinationPicture={destinationPicture}
                                    setDestinationPicture={setDestinationPicture}
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
                                    destinationPicture={destinationPicture}
                                    setDestinationPicture={setDestinationPicture}
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
                                    newActivity={newActivity}
                                    setNewActivity={setNewActivity}
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