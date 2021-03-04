import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';

export default function Signup() {

    const [username, setUsername] = useState("");
    const [pass, setPass] = useState("");
    const [redirect, setRedirect] = useState("");

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "username") {
            setUsername(value);
        } else {
            setPass(value);
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const user = {
            username: username,
            password: pass
        }

        API.signUp(user)
            .then((res) => {
                console.log(res)
                if (!res.data.error) {
                    console.log('signup successful');
                    setRedirect("/login");
                } else {
                    alert("username already taken")
                    console.log('username already taken');
                }
            })
            .catch(err => console.log(err));
    }

    if (redirect) {
        return <Redirect to={{ pathname: redirect }} />
    } else {
        return (
            <div style={{ border: "3px double blue" }}>
                <h3>Sign Up!</h3>
                <form>
                    <p>
                        <input
                            type="text"
                            name="username"
                            placeholder="username"
                            onChange={(e) => handleInputChange(e)} />
                    </p>
                    <p>
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            onChange={(e) => handleInputChange(e)} />
                    </p>
                    <button onClick={(e) => handleFormSubmit(e)}>Submit</button>
                </form>
            </div>
        )
    }
}
