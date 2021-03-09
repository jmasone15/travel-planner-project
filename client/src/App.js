import React from "react";
import Router from "./Router";
import axios from "axios";
import { AuthContextProvider } from "./context/AuthContext";
import { UserContextProvider } from "./context/UserContext";
import { CSSPlugin } from 'gsap/CSSPlugin';
import gsap from "gsap";

axios.defaults.withCredentials = true;

function App() {
  gsap.registerPlugin(CSSPlugin)

  return (
    <AuthContextProvider>
      <UserContextProvider>
        <Router />
      </UserContextProvider>
    </AuthContextProvider>
  );
}

export default App;
