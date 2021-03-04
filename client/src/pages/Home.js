import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import API from '../utils/API';

export default function Home(props) {

    const [redirect, setRedirect] = useState("");

    console.log(props.user.loggedIn);

    const handleLogout = (e) => {
        e.preventDefault();

        API.logout().then(res => {
            console.log(res.data);
            if (res.status === 200) {
                props.updateUser({
                    loggedIn: false,
                    username: null
                });
            }
        }).catch(error => {
            console.log('Logout error');
            console.log(error);
        })
    }

    const handleRedirect = (e) => {
        if (e.target.name === "signup") {
            setRedirect("signup")
        } else {
            setRedirect("login")
        }

    }

    if (props.user.loggedIn === true) {
        return (
            <div>
                <h1>Travel Planner!</h1>
                <p>You are logged in. Great Job {props.user.username}!</p>
                <button onClick={(e) => handleLogout(e)}>Logout</button>
            </div>
        )
    } else if (redirect === "signup") {
        return (
            <Redirect to={{ pathname: redirect }} />
        )
    } else if (redirect === "login") {
        return (
            <Redirect to={{ pathname: redirect }} />
        )
    } else if (props.user.loggedIn === false) {
        return (
            <div>
                <h1>Travel Planner!</h1>
                <p>Login or Signup to set up your vacation!</p>
                <button name="login" onClick={(e) => handleRedirect(e)}>Login</button>
                <button name="signup" onClick={(e) => handleRedirect(e)}>Signup</button>
            </div>
        )
    }
}

{/* <Router>
  <div className="App">
    <Route exact path="/" component={Calender} />
    <Route exact path="/todo" component={Recommend} />
    <Route exact path="/map" component={Map} />

  </div>
</Router> */}