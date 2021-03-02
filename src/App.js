import './App.css';
import { React, useState } from 'react';

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
    <div className="App">
      <h1>Travel Planner!</h1>
      <br />
      <h3>Enter your budget: </h3>
      <input type="text" name="budget" value={budget} onChange={(e) => handleInput(e)} />
      <br />
      <h3>Enter your destination: </h3>
      <input type="text" name="destination" value={destination} onChange={(e) => handleInput(e)} />
      <br /><br />
      <div>
        <h3>{showData ? `Budget: ${budget}` : ""}</h3>
        <h3>{showData ? `Destination: ${destination}` : ""}</h3>
        <br />
        {showData ? <button onClick={(e) => handleFormSubmit(e)}>Submit</button> : ""}
      </div>
      { showTrip ?
        <div>
          <h2>Your Trip:</h2>
          <h4>Destination: {userData.destination}</h4>
          <h4>Budget: {userData.budget}</h4>
        </div> : ""}
    </div>
  );
}

export default App;
