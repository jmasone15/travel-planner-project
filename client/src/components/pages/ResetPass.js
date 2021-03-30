import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

export default function ResetPass() {

    const [password, setPassword] = useState("");
    const [passwordVer, setPasswordVer] = useState("");
    const [email, setEmail] = useState("");
    const [switcher, setSwitcher] = useState(false);
    const params = useParams();
    const history = useHistory();

    async function getUserData() {
        try {
            const resetData = await axios.get("/user/reset", {
                params: {
                    resetPasswordToken: params.token
                }
            });
            setEmail(resetData.data.email)
        } catch (err) {
            console.error(err)
        }
    }

    async function updatePassword(e) {
        e.preventDefault();

        if (password === passwordVer) {
            try {
                await axios.put("/user/reset/password", { email: email, password: password });

                setEmail("");
                setPassword("");
                setPasswordVer("");
                setSwitcher(true);
            } catch (err) {
                console.error(err)
                alert("Password reset failed, please try again.")
            }
        } else {
            alert("Passwords don't match")
        }
    }

    function logIn(e) {
        e.preventDefault();
        history.push("/");
    }

    useEffect(() => {
        getUserData();
    })

    return (
        <div className="bgThis">
            <br /><br />
            {switcher === false && (
                <div className="container shadow bg-light p-5 mt-3 col-lg-10" style={{ width: "500px", marginTop: "50px" }}>
                    <h3>Reset Password</h3>
                    <form onSubmit={(e) => updatePassword(e)}>
                        <label>Enter your new password:</label>
                        <input type="text" placeholder="Password" style={{ marginBottom: "10px" }} value={password} required onChange={(e) => setPassword(e.target.value)} />
                        <input type="text" placeholder="Enter password again" value={passwordVer} required onChange={(e) => setPasswordVer(e.target.value)} />
                        <button type="submit" className="btn btn-secondary mt-2 p-2 shadow">Change Password</button>
                    </form>
                </div>
            )}
            {switcher === true && (
                <div className="container shadow bg-light p-5 mt-3 col-lg-10" style={{ width: "500px", marginTop: "50px" }}>
                    <h3>Password Reset Successful</h3>
                    <button className="btn btn-secondary mt-2 p-2 shadow" onClick={(e) => logIn(e)}>Log In</button>
                </div>
            )}
        </div>
    )
}
