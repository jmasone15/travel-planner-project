import axios from "axios";
const router = require("express").Router();
const auth = require("../middleware/auth");
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

router.post("/location", auth, async (req, res) => {
    try {
        res.json(await axios.post(Locate));

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/userCity", auth, async (req, res) => {
    try {
        res.json(await axios.get(getCity + req.lat + "," + req.lng + "&locality" + "&key=" + GOOGLE_API_KEY));

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/attractions", auth, async (req, res) => {
    try {
        const query = formatQuery(req.where)
        res.json(await axios.get(BASEURL + query + "+points+of+interest" + language + "&key=" +  GOOGLE_API_KEY));

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/hotels", auth, async (req, res) => {
    try {
        const query = formatQuery(req.where)
        res.json(await axios.get(BASEURL + query + "+hotels" + language + "&key=" +  GOOGLE_API_KEY));

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/shopping", auth, async (req, res) => {
    try {
        const query = formatQuery(req.where)
        res.json(await axios.get(BASEURL + query + "+shopping" + language + "&key=" +  GOOGLE_API_KEY));

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/restaurants", auth, async (req, res) => {
    try {
        const query = formatQuery(req.where)
        res.json(await axios.get(BASEURL + query + "+restaurants" + language + "&key=" +  GOOGLE_API_KEY));

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});
// function getLocation() {
//     return axios.post(Locate);
// }

// function getUserCity(lat, lng) {
//     return axios.get(getCity + lat + "," + lng + "&locality" + "&key=" + GOOGLE_API_KEY);
// }

// function attractions(where) {
//     const query = formatQuery(where)
//     return axios.get(BASEURL + query + "+points+of+interest" + language + "&key=" +  GOOGLE_API_KEY);
// }

// function hotels(where) {
//     const query = formatQuery(where)
//     return axios.get(BASEURL + query + "+hotels" + language + "&key=" +  GOOGLE_API_KEY);
// }

// function shopping(where) {
//     const query = formatQuery(where)
//     return axios.get(BASEURL + query + "+shopping" + language + "&key=" +  GOOGLE_API_KEY);
// }

// function restaurants(where) {
//     const query = formatQuery(where)
//     return axios.get(BASEURL + query + "+restaurants" + language + "&key=" +  GOOGLE_API_KEY);
// }

// function hotels(where) {
//     query = formatQuery(where)
//     return axios.get(BASEURL + query + language + APIKEY);
// }

// function hotels(where) {
//     formatQuery(where)
//     return axios.get(BASEURL + query + language + APIKEY);
// }
// }

module.exports = router;