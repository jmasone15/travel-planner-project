const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const passport = require('passport');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-routes');
require("./middleware/auth/auth");

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/public"));
}

// Define middleware here

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json());

app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);
app.use('/', routes);


// Connect to the Mongo DB
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/travelplanner",
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

app.listen(PORT, function () {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});