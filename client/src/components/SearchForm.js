import { React, useState, useEffect } from 'react';
import { attractions, hotels, shopping, restaurants } from "../routes/API"
import Card from "./Card"
import captureArray from './MapContainer';
import MapContainer from "./MapContainer"


function SearchForm() {


  const [showResults, setShowResults] = useState(false)
  const [type, setType] = useState([])
  const [poiArray, setPoiArray] = useState([])
  const [hotelsArray, setHotelsArray] = useState([])
  const [shoppingArray, setShoppingArray] = useState([])
  const [restaurantsArray, setRestaurantsArray] = useState([])

  useEffect(() => {

    getPoi("new york")
    getHotels("new york")
    getShop("new york")
    getFood("new york")

  }, []);

  function getPoi() {
    attractions("new york").then((results) => {
      setPoiArray(results.data.results);
    })
  }

  function getHotels() {
    hotels("new york").then((results) => {
      setHotelsArray(results.data.results);
    })
  }

  function getShop() {
    shopping("new york").then((results) => {
      setShoppingArray(results.data.results);
    })
  }

  function getFood() {
    restaurants("new york").then((results) => {
      setRestaurantsArray(results.data.results);
    })
  }


  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(shoppingArray);
    const name = e.target.name
    switch (name) {
      case "attractions":
        setType(poiArray);
        setShowResults(true);
        break;
      case "hotels":
        setType(hotelsArray);

        setShowResults(true);
        break;
      case "shopping":
        setType(shoppingArray);
        setShowResults(true);
        break;
      case "restaurants":
        setType(restaurantsArray);
        setShowResults(true);
        break;
    }

  }


  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="search">Things to do:</label>
          <button name="attractions" onClick={(e) => handleFormSubmit(e)}>Attractions</button>
          <button name="hotels" onClick={(e) => handleFormSubmit(e)}>Hotels</button>
          <button name="shopping" onClick={(e) => handleFormSubmit(e)}>Shopping</button>
          <button name="restaurants" onClick={(e) => handleFormSubmit(e)}>Restaurants</button>

        </div>
      </form>

      <MapContainer props={type} />

      {showResults ? <Card data={type} /> : null}
    </div>

  );
}

export default SearchForm;
