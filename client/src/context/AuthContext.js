import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();


function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(undefined);

    async function getLoggedIn() {
        const loggedInResponse = await axios.get("/user/loggedIn");
        setLoggedIn(loggedInResponse.data);
    }

    useEffect(() => {
        getLoggedIn();
    }, []);
    return (
        <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
export { AuthContextProvider };
