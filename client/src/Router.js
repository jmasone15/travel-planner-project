import React, { useContext } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/pages/Home";
import Navbar from "./components/pages/Navbar";
import BudgetPage from "./components/pages/BudgetPage";
import AuthContext from "./context/AuthContext";
import Recommend from "./components/pages/Recommend";

export default function Router() {

    const { loggedIn } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                {loggedIn === false && (
                    <>
                        <Route exact path="/">
                            <Signup />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                    </>
                )}
                {loggedIn === true && (
                    <>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Route path="/budget">
                            <BudgetPage />
                        </Route>
                        <Route path="/recommend">
                            <Recommend />
                        </Route>
                    </>
                )}
            </Switch>
        </BrowserRouter>
    )
}