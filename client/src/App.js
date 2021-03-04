import './App.css';
import React from 'react';
import Signup from './pages/Signup';
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Route } from 'react-router-dom';
import axios from "axios";
import Calendar from "./components/Calender";
import Recommend from "./pages/Recommend";

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser(userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log(response.data)
      if (response.data.user) {
        console.log('There is a user saved in the server session.')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Route
          exact path="/"
          render={() =>
            <Home
              updateUser={this.updateUser}
              user={this.state}
            />}
        />
        <Route
          path="/login"
          render={() =>
            <Login
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/signup"
          render={() =>
            <Signup />}
        />

        <Route
          path="/calendar"
          component={Calendar}
        />

        <Route
          path="/search"
          component={Recommend}
        />

      </div>
    );
  }
}

export default App;