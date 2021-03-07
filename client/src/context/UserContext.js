import React, { createContext, useEffect, useState, useContext } from 'react'
import AuthContext from "./AuthContext";

const UserContext = createContext();

function UserContextProvider(props) {
    const [userId, setUserId] = useState("");
    const { loggedIn } = useContext(AuthContext);

    async function getUserId() {
        if (loggedIn === true) {
            const token = document.cookie;
            const payload = JSON.parse(window.atob(token.split('.')[1]));
            const id = payload.user;
            setUserId(id);
        }

    }

    useEffect(() => {
        getUserId();
    });
    return (
        <UserContext.Provider value={{ userId, getUserId }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContext;
export { UserContextProvider };