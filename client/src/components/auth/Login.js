import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import AuthContext from '../../context/AuthContext';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { getLoggedIn } = useContext(AuthContext);
    const history = useHistory();

    async function login(e) {
        e.preventDefault();

        try {
            const loginData = {
                email,
                password,
            };

            await axios.post("/user/login", loginData);
            await getLoggedIn();
            history.push("/home");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h1>Login to your account</h1>
            <form onSubmit={(e) => login(e)}>
                <input type="email" placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login!</button>
            </form>
        </div>
    )
}
