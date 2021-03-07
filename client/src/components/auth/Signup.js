import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router';
import AuthContext from '../../context/AuthContext';

export default function Signup() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");

    const { getLoggedIn } = useContext(AuthContext);
    const history = useHistory();

    async function register(e) {
        e.preventDefault();

        try {
            const registerData = {
                email: email,
                password: password,
                passwordVerify: passwordVerify
            };


            await axios.post("/user/", registerData);
            await getLoggedIn();
            history.push("/home");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <h1>Register a new account</h1>
            <form onSubmit={(e) => register(e)}>
                <input type="email" placeholder="Email" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="Verify your Password" value={passwordVerify}
                    onChange={(e) => setPasswordVerify(e.target.value)} />
                <button type="submit">Sign Up!</button>
            </form>
        </div>
    )
}
