const mongoose = require("mongoose");

const travelSchema = new mongoose.Schema({
    tripName: { type: String, required: true },
    budget: { type: Number, required: true },
    expenses: { type: Array },
    activities: { type: Array },
    startLocation: { type: String, required: true },
    destination: { type: String, required: true },
    dates: { type: Array, required: true },
    userId: { type: String, required: true }
});

const Travel = mongoose.model("travel", travelSchema);

module.exports = Travel;