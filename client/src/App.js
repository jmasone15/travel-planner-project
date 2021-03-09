import React from "react";
import Router from "./Router";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";
import { UserContextProvider } from "./context/UserContext";
import gsap from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin'
axios.defaults.withCredentials = true;

function App() {

  return (
    <AuthContextProvider>
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
