const express = require('express');
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Needed for localhost
dotenv.config();

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

// Server Setup
const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// Makes sure any incoming request is read as JSON
// If it is JSON, it parses the data and puts in into req.body
// Middleware
app.use(allowCrossDomain);
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Mongo DB Setup

// For Heroku use this
// mongoose.connect(
//     process.env.MONGODB_URI || 'mongodb://localhost/travelplannerdb',
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//         useFindAndModify: false
//     }
// );

// For local project use this
mongoose.connect(process.env.MDB_CONNECT || "mongodb://localhost/travelplannerdb",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err) => {
        if (err) return console.error(err);
        console.log("Connected to MongoDB");
    }
);

// Routes Set Up
// When the path has "/auth" in it, express will then use the userRoutes file
app.use("/user", require("./routes/userRoutes"));
app.use("/api", require("./routes/travelRoutes"));

// Only use for heroku
// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });