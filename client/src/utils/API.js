import axios from 'axios';

export default {
    signUp: function (user) {
        return axios.post("/user/", user)
    },
    login: function (user) {
        return axios.post("/user/login", user)
    },
    logout: function () {
        return axios.post("user/logout")
    }
    
} 