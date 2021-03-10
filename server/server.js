const express = require('express');
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();

// Server Setup
const app = express();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Makes sure any incoming request is read as JSON
// If it is JSON, it parses the data and puts in into req.body
// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));

// Mongo DB Setup
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
// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });