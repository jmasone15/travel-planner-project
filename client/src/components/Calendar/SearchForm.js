import { React, useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { useHistory } from 'react-router';
import MyCard from "./MyCard"
import Calender from './Calender';
import axios from "axios";
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
  const [latLng, setLatLng] = useState({ lat: 34.0902, lng: -95.7129 })
  const [formattedLocation, setFormattedLocation] = useState("")
  const [reset, setReset] = useState();
  const history = useHistory();


  useEffect(async () => {

    if (!askOnce) {
      const userLocation = await axios.get("/google/location")
      setAskOnce(true)
      setLatLng({ lat: userLocation.data.location.lat, lng: userLocation.data.location.lng })
      const userCity = await axios.get("/google/userCity", {lat: userLocation.data.location.lat, lng: userLocation.data.location.lng})
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

    axios.get("/google/attractions", where).then((results) => {
      setPoiArray(results.data.results);
    })
  }

  function getHotels(where) {
    axios.get("/google/hotels", where).then((results) => {
      setHotelsArray(results.data.results);
    })
  }

  function getShop(where) {
    axios.get("/google/shopping", where).then((results) => {
      setShoppingArray(results.data.results);
    })
  }

  function getFood(where) {
    axios.get("/google/restaurants", where).then((results) => {
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

  

  async function handleBtnClick() {

    

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
      console.log(currentTrip)

      const formattedPlace = currentTrip.destination.replace(/[ ,.]/g, ' ').toLowerCase().split(" ").join("+");
      axios.get(`/google/pic/${formattedPlace}`).then((e) => {
        props.setDestinationPicture(e)
      })

    
      props.setTripStartLocation(currentTrip.startLocation);
      props.setTripDestination(currentTrip.destination);
      props.setTripDates(array);

      setShowReview(true);
      setReset("")
      setFormattedLocation("")
      history.push("/review")



    }

  }



  return (
    <div className="wrapper">
      <MapContainer props={latLng} type={type} style={{
        position: "fixed",
        top: "0px",
        left: "0px",
        width: "100%",
        minHeight: "100%",
        padding: 0,
        border: 0,
        zIndex: 0,
      }}>
        <div className="container m-3" style={{
          height: "44vh",
          // backgroundColor: "white",
          position: "relative",
          zIndex: 1
        }}>
          <div className="row" style={{
            textAlign: "center",
            // height: "45vh",
            width: "auto",
            marginTop: "10%"

          }}>
            <div className="col-md-5 p-4 shadow-lg bg-white calendarForm" >
              <form className="">
                <div className="form-group m-0">
                  {/* <input name="title" placeholder={"Trip name"} value={reset} onChange={(e) => setCurrentTrip({ ...currentTrip, name: e.target.value })} /> */}
                  <SearchBar placeholder={"Start location"} currentTrip={currentTrip} setCurrentTrip={setCurrentTrip} />
                  <br></br>
                  <SearchBar placeholder={"Destination"} setDestinationPicture={props.setDestinationPicture} currentTrip={currentTrip} setCurrentTrip={setCurrentTrip} />
                  <br></br>
                  <Calender startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate} />
                  <button className="btn btn-block btn-primary col-lg-8 centerX mt-3" type="button" onClick={() => handleBtnClick()}>Submit</button>
                </div>
              </form>

            </div>

          </div>

          {/* <Itinerary props={datesArray} currentTrip={currentTrip} setCurrentTrip={setCurrentTrip} editDate={editDate} setEditDate={setEditDate} /> */}
        </div>
      </MapContainer>

    </div>
  );
}

export default SearchForm;
