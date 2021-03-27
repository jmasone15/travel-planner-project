const axios = require("axios");
const router = require("express").Router();
const auth = require("../middleware/auth");
const GOOGLE_API_KEY = require("./key");
const BASEURL = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=";
const Locate = "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCoiYtN7Xjb7P4JIpWRtlMiL9uQirs_icI"
const language = "&language=en"
const getCity = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";


function formatQuery(query) {
    if (typeof query === "object") {
        query === query.formatted_address
    }
    const newQuery = query.replace(/[ ,.]/g, ' ').toLowerCase().split(" ").join("+");
    const newNewQuery = newQuery.replace(',', '');
    return newNewQuery
}

router.post("/location", auth, async (req, res) => {
    try {
        let userLocation = await axios.post(Locate)
        console.log(userLocation);
        res.json(userLocation);

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

router.get(`/pic/:formattedPlace`, auth, async (req, res) => {
    console.log(req.params.formattedPlace);
    try {
        const destinationInfo = await axios.get(BASEURL + req.params.formattedPlace  + language + "&key=" + GOOGLE_API_KEY);

        console.log(destinationInfo);
        res.status(200).json(destinationInfo.data.results[0].photos[0].photo_reference);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
})

router.get("/attractions/:where", auth, async (req, res) => {
    try {
        const query = formatQuery(req.params.where)
        const attractionsData = await axios.get(BASEURL + query + "+points+of+interest" + language + "&key=" + GOOGLE_API_KEY);

        res.status(200).json(attractionsData.data);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/hotels/:where", auth, async (req, res) => {
    try {
        const query = formatQuery(req.params.where)
        const hotelsData = await axios.get(BASEURL + query + "+hotels" + language + "&key=" + GOOGLE_API_KEY);

        res.status(200).json(hotelsData.data);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/shopping/:where", auth, async (req, res) => {
    try {
        const query = formatQuery(req.params.where)
        const shoppingData = await axios.get(BASEURL + query + "+shopping" + language + "&key=" + GOOGLE_API_KEY);

        res.status(200).json(shoppingData.data);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/restaurants/:where", auth, async (req, res) => {
    try {
        const query = formatQuery(req.params.where)
        const restaurantsData = await axios.get(BASEURL + query + "+restaurants" + language + "&key=" + GOOGLE_API_KEY);

        res.status(200).json(restaurantsData.data);

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