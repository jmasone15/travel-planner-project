import './App.css';
import { React, useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import SearchForm from "./components/SearchForm"
import Recommend from "./pages/Recommend"
import Calender from "./components/Calender"
import Map from "./components/MapContainer"

function App() {

  const [budget, setBudget] = useState("");
  const [destination, setDestination] = useState("");
  const [showData, setShowData] = useState(false);
  const [showTrip, setShowTrip] = useState(false);
  const [userData, setUserData] = useState({
    budget: "",
    destination: ""
  });

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "budget") {
      setBudget(value);
      setShowData(true);
    } else {
      setDestination(value);
      setShowData(true);
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUserData({
      budget: budget,
      destination: destination
    });
    setBudget("");
    setDestination("");
    setShowData(false);
    setShowTrip(true);
  }

  return (
    <Router>
    <div className="App">
      <Route exact path="/" component={Calender} />
      <Route exact path="/todo" component={Recommend} />
      <Route exact path="/map" component={Map} />

    </div>
  </Router>
  );
}

export default App;
