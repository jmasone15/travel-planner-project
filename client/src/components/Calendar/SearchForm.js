import { React, useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { useHistory } from 'react-router';
import { attractions, hotels, shopping, restaurants, getLocation, getUserCity } from "../../routes/API"
import MyCard from "./MyCard"
import Calender from './Calender';
import MapContainer from "./MapContainer"
import Itinerary from "./Itinerary"
import AddStuff from "./AddStuff"
import SearchBar from "./Autocomplete"


function SearchForm(props) {

  const [currentTrip, setCurrentTrip] = useState({})
  const [showReview, setShowReview] = useState(false);
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [datesArray, setDatesArray] = useState([])
  const [showResults, setShowResults] = useState()
  const [type, setType] = useState([])
  const [poiArray, setPoiArray] = useState([])
  const [hotelsArray, setHotelsArray] = useState([])
  const [shoppingArray, setShoppingArray] = useState([])
  const [restaurantsArray, setRestaurantsArray] = useState([])
  const [editDate, setEditDate] = useState(0)
  const [askOnce, setAskOnce] = useState(false)
  const [latLng, setLatLng] = useState({ lat: 54.526, lng: 95.7129 })
  const [formattedLocation, setFormattedLocation] = useState("")
  const [reset, setReset] = useState();
  const history = useHistory();


  useEffect(async () => {

    if (!askOnce) {
      const userLocation = await getLocation()
      setAskOnce(true)
      setLatLng({ lat: userLocation.data.location.lat, lng: userLocation.data.location.lng })
      const userCity = await getUserCity(userLocation.data.location.lat, userLocation.data.location.lng)
      const results = userCity.data.results
      await cityState(results)
    }


    if (currentTrip.destination !== undefined) {
      getPoi(currentTrip.destination)
      getHotels(currentTrip.destination)
      getShop(currentTrip.destination)
      getFood(currentTrip.destination)
    }
    else if (currentTrip.startLocation !== undefined) {
      getPoi(currentTrip.startLocation)
      getHotels(currentTrip.startLocation)
      getShop(currentTrip.startLocation)
      getFood(currentTrip.startLocation)
    }

  }, [currentTrip]);


  useEffect(() => {

  }, [currentTrip, editDate, latLng, formattedLocation, reset])

  function getPoi(where) {

    attractions(where).then((results) => {
      setPoiArray(results.data.results);
    })
  }

  function getHotels(where) {
    hotels(where).then((results) => {
      setHotelsArray(results.data.results);
    })
  }

  function getShop(where) {
    shopping(where).then((results) => {
      setShoppingArray(results.data.results);
    })
  }

  function getFood(where) {
    restaurants(where).then((results) => {
      setRestaurantsArray(results.data.results);
    })
  }

  async function cityState(results) {

    let city;
    let country;
    let region;

    if (results[1]) {
      var indice = 0;
      for (var j = 0; j < results.length; j++) {
        if (results[j].types[0] == 'locality') {
          indice = j;
          break;
        }
      }

      for (var i = 0; i < results[j].address_components.length; i++) {
        if (results[j].address_components[i].types[0] == "locality") {
          //this is the object you are looking for City
          city = results[j].address_components[i];
        }
        if (results[j].address_components[i].types[0] == "administrative_area_level_1") {
          //this is the object you are looking for State
          region = results[j].address_components[i];
        }
        if (results[j].address_components[i].types[0] == "country") {
          //this is the object you are looking for
          country = results[j].address_components[i];
        }
      }

      //city data
      await setCurrentTrip({ ...currentTrip, startLocation: city.long_name + " " + region.long_name + " " + country.short_name })
      setFormattedLocation(city.long_name + ", " + region.long_name + " " + country.short_name)


    } else {
      alert("No results found");
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

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

  function handleBtnClick() {



    if ((startDate !== null) && (endDate !== null)) {

      var getDaysBetweenDates = () => {
        var now = startDate.clone(), dates = [];

        while (now.isSameOrBefore(endDate)) {
          dates.push(now.format('MM/DD/YYYY'));
          now.add(1, 'days');
        }
        return (dates);
      }

      let array = []

      let myDates = getDaysBetweenDates()
      setDatesArray(myDates)

      for (let i = 0; i < myDates.length; ++i) {
        let eachDay = {
          name: myDates[i],
          activities: []
        };
        array.push(eachDay)
      }
      console.log(array);


      setCurrentTrip({ ...currentTrip, days: array })

      props.setTripTripName(currentTrip.name);
      props.setTripStartLocation(currentTrip.startLocation);
      props.setTripDestination(currentTrip.destination);
      props.setTripDates(JSON.stringify(array));

      setShowReview(true);
      setReset("")
      setFormattedLocation("")








    }

  }

  // function handleTripSubmit(e) {
  //   e.preventDefault();
  //   console.log(props.tripTripName);
  //   console.log(props.tripStartLocation);
  //   console.log(props.tripDestination);
  //   console.log(props.tripDates);
  //   history.push("/review")
  // }


  return (
    <div>
      <form>
        <div className="form-group">
          <label htmlFor="search">Things to do:</label>
          <button name="attractions" onClick={(e) => handleFormSubmit(e)}>Attractions</button>
          <button name="hotels" onClick={(e) => handleFormSubmit(e)}>Hotels</button>
          <button name="shopping" onClick={(e) => handleFormSubmit(e)}>Shopping</button>
          <button name="restaurants" onClick={(e) => handleFormSubmit(e)}>Restaurants</button>
          <input name="title" placeholder={"Trip name"} value={reset} onChange={(e) => setCurrentTrip({ ...currentTrip, name: e.target.value })} />
          <SearchBar placeholder={"Start location"} currentTrip={currentTrip} setCurrentTrip={setCurrentTrip} />
          <SearchBar placeholder={"Destination"} currentTrip={currentTrip} setCurrentTrip={setCurrentTrip} />

          {/* <input id="my-input-searchbox" name="startLocaation" placeholder={"Start location"} value={formattedLocation} onChange={(e) => setCurrentTrip({ ...currentTrip, startLocation: e.target.value })} />
          <input id="my-input-searchbox" name="destination" placeholder={"Destination"} value={reset} onChange={(e) => setCurrentTrip({ ...currentTrip, destination: e.target.value })} /> */}

        </div>
      </form>

      <Calender startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} />
      <button type="button" onClick={() => handleBtnClick()}>Submit</button>
      {showReview ? <button type="button" onClick={history.push("/review")}>Review Trip Info</button> : ""}
      <Itinerary props={datesArray} currentTrip={currentTrip} setCurrentTrip={setCurrentTrip} editDate={editDate} setEditDate={setEditDate} />

      <MapContainer props={latLng} type={type} />
      <AddStuff props={setCurrentTrip} currentTrip={currentTrip} editDate={editDate} />


      {showResults ? <MyCard data={type} /> : null}
    </div>

  );
}

export default SearchForm;
