const mongoose = require('mongoose'),
const Schema = mongoose.Schema;

const thirdPartyProviderSchema = new Schema({
    provider_name: {
        type: String,
        default: null
    },
    provider_id: {
        type: String,
        default: null
    },
    provider_data: {
        type: {},
        default: null
    }
});

const userSchema = new Schema({
    username: {
        type: String,
        required: "Please enter a valid username.",
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    email_is_verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: "Please enter a valid password."
    },
    third_party_auth: [thirdPartyProviderSchema],
    date: {
        type: Date,
        default: Date.now
    }
});



const User = mongoose.model("users", userSchema);

module.exports = User;