import axios from 'axios';
import React, { useState } from 'react'

export default function Forgot() {

    const [email, setEmail] = useState("");
    const [switcher, setSwitcher] = useState(false);

    async function forgotPassword(e) {
        e.preventDefault();

        try {
            const userData = { email: email };
            await axios.post("/user/forgot", userData);
            setSwitcher(true)

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="bgThis">
            <br /><br />
            {switcher === false && (
                <div className="container shadow bg-light p-5 mt-3 col-lg-10" style={{ width: "500px", marginTop: "50px" }}>
                    <h3>Forgot Password?</h3>
                    <form onSubmit={(e) => forgotPassword(e)}>
                        <label>Enter your email:</label>
                        <input type="text" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)} />
                        <button type="submit" className="btn btn-secondary mt-2 p-2 shadow">Recover Password</button>
                    </form>
                </div>
            )}
            {switcher === true && (
                <div className="container shadow bg-light p-5 mt-3 col-lg-10" style={{ width: "500px", marginTop: "50px" }}>
                    <h3>Reset Link sent</h3>
                    <p>Please check your email for further instructions to reset your password.</p>
                </div>
            )}
        </div>
    )
}
