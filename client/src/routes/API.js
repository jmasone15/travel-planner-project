import axios from "axios";
import GOOGLE_API_KEY from "./key";
const BASEURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
const Locate = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCoiYtN7Xjb7P4JIpWRtlMiL9uQirs_icI"
const language = "&language=en"
const getCity = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";


function formatQuery(query) {
    if (typeof query == "object") {
        query = query.formatted_address
    }
    const newQuery = query.replace(',', '').toLowerCase().split(" ").join("+")

    return newQuery
}

function getLocation() {
    return axios.post(Locate);
}

function getUserCity(lat, lng) {
    return axios.get(getCity + lat + "," + lng + "&locality" + GOOGLE_API_KEY);
}

function attractions(where) {
    const query = formatQuery(where)
    return axios.get(BASEURL + query + "+points+of+interest" + language + GOOGLE_API_KEY);
}

function hotels(where) {
    const query = formatQuery(where)
    return axios.get(BASEURL + query + "+hotels" + language + GOOGLE_API_KEY);
}

function shopping(where) {
    const query = formatQuery(where)
    return axios.get(BASEURL + query + "+shopping" + language + GOOGLE_API_KEY);
}

function restaurants(where) {
    const query = formatQuery(where)
    return axios.get(BASEURL + query + "+restaurants" + language + GOOGLE_API_KEY);
}

// function hotels(where) {
//     query = formatQuery(where)
//     return axios.get(BASEURL + query + language + APIKEY);
// }

// function hotels(where) {
//     formatQuery(where)
//     return axios.get(BASEURL + query + language + APIKEY);
// }
// }

export { attractions, hotels, shopping, restaurants, getLocation, getUserCity };