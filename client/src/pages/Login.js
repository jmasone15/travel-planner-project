import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import API from '../utils/API';

export default function Login(props) {

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

        API.login(user)
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    props.updateUser({
                        loggedIn: true,
                        username: res.data.username
                    })
                    console.log(`Welcome ${res.data.username}`)
                    setRedirect("/");
                } else {
                    console.log('Invalid credentials')
                }
            })
            .catch(err => console.log(err));
    }

    if (redirect) {
        return <Redirect to={{ pathname: redirect }} />
    } else {
        return (
            <div style={{ border: "3px double blue" }}>
                <h3>Login!</h3>
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
