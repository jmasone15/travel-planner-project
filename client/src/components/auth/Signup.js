import axios from "axios";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import AuthContext from "../../context/AuthContext";
// import Container from "../Card";
import { Link } from "react-router-dom";
import * as goIcons from "react-icons/go";
// import * as mdIcons from "react-icons/md";
import "../Card/style.css";
import Bgv from "../../components/Video/bgv.mp4";

function SignUp() {
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
        passwordVerify: passwordVerify,
      };

      await axios.post("/user/", registerData);
      await getLoggedIn();
      history.push("/home");
    } catch (err) {
      alert(err.request.response);
    }
  }

  return (
    <div className="container h-100 mt-5 thisFont">
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: "-1",
        }}
      >
        <source src={Bgv} type="video/mp4" />
      </video>
      <div className="d-flex justify-content-center h-100">
        <div className="user_card">
          <div className="d-flex justify-content-center">
            <div className="brand_logo_container font"></div>
          </div>
          <div className="d-flex justify-content-center form_container">
            <form onSubmit={(e) => register(e)}>
              <div className="input-group mb-3 mt-3">
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fas fa-user"></i>
                  </span>
                </div>
                <input
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control input_user"
                  value={email}
                  placeholder=" enter email..."
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fas fa-key"></i>
                  </span>
                </div>
                <input
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control input_user"
                  value={password}
                  placeholder=" create password..."
                />
              </div>
              <div className="input-group mb-2">
                <div className="input-group-append">
                  <span className="input-group-text">
                    <goIcons.GoVerified />
                  </span>
                </div>
                <input
                  type="password"
                  onChange={(e) => setPasswordVerify(e.target.value)}
                  className="form-control input_pass"
                  value={passwordVerify}
                  placeholder="verify password..."
                />
              </div>
              <small id="passwordHelpBlock" class="form-text text-muted text-center">
                Your password must be 6 characters long
              </small>
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customControlInline"
                  />
                  <label
                    className="custom-control-label"
                    for="customControlInline"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-center mt-3 login_container">
                <button
                  type="submit"
                  name="button"
                  className="btn login_btn"
                >
                  ¿Sign Up?
                  </button>
              </div>
            </form>
          </div>

          <div className="mt-2">
            <div className="d-flex justify-content-center links mb-4">
              Have an account?<Link to="/"> ¿Login?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
