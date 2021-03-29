import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import bgBlue from "../../images/bgBlue.png";
import ReviewPage from "./ReviewPage";

export default function ProfilePage(props) {
  const { userId } = useContext(UserContext);
  const [tripArray, setTripArray] = useState([]);
  const [profileEmail, setProfileEmail] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePass, setUpdatePass] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const history = useHistory();

  async function getUserData() {
    const userData = await axios.get(`user/profile/${userId}`);
    setProfileEmail(userData.data.email);
  }

  function getDateRange(x) {
    let result = x.map((date) => date.name);
    return `${result[0]} - ${result[result.length - 1]}`;
  }

  async function getTripData() {
    const userTrips = await axios.get(`api/${userId}`);
    setTripArray(userTrips.data);
    console.log(userTrips.data);
  }

  async function removeTrip(e, id) {
    e.preventDefault();

    try {
      await axios.delete(`/api/${id}`);
      getTripData();
    } catch (err) {
      console.error(err);
    }
  }

  async function updateProfile(e) {
    e.preventDefault();

    try {
      await axios.put(`/user/profile/info/${userId}`, {
        email: updateEmail,
        password: updatePass,
      });
      alert("Profile Updated");
      setShowProfile(false);
      getUserData();
    } catch (err) {
      alert(err.request.response);
    }
  }

  async function updateTrip(e, id) {
    e.preventDefault();
    props.setUpdateId(id);
    history.push("/update");
  }

  function btnClick(e) {
    e.preventDefault();
    history.push("/budget");
  }

  function updateClick(e, value) {
    e.preventDefault();
    setUpdateEmail(profileEmail);
    setShowProfile(value);
  }

  useEffect(() => {
    getUserData();
    getTripData();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${bgBlue})`,
        position: "relative",
        height: "100vh",
        height: " 100%",
        width: "100%",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>Welcome, {profileEmail}</h1>
        <button
          style={{ backgroundColor: "#4c6967" }}
          className="btn text-white"
          onClick={(e) => updateClick(e, true)}
        >
          Edit your profile
        </button>
      </div>
      {showProfile ? (
        <div
          className="container shadow p-5 mt-3 col-lg-10"
          style={{
            width: "500px",
            marginTop: "50px",
            backgroundColor: "#b1d1b4b7",
          }}
        >
          <label>Change your profile email:</label>
          <input
            type="text"
            value={updateEmail}
            onChange={(e) => setUpdateEmail(e.target.value)}
          />
          <br />
          <br />
          <label>Change your profile password:</label>
          <input
            type="password"
            value={updatePass}
            onChange={(e) => setUpdatePass(e.target.value)}
          />
          <br />
          <br />
          <div style={{ textAlign: "center" }}>
            <button
              className="btn btn-block btn-primary mt-2 p-2 shadow"
              onClick={(e) => updateProfile(e)}
            >
              Update Profile
            </button>
            <button
              className="btn btn-block btn-danger mt-2 p-2 shadow"
              onClick={(e) => updateClick(e, false)}
            >
              Changed my mind.
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
      <br />
      <br />
      {tripArray.length === 0 && (
        <div style={{ marginTop: "150px", textAlign: "center" }}>
          <h3>No Trips saved to your profile</h3>
          <button
            class="btn btn-block btn-success mt-2 p-2 shadow"
            onClick={(e) => btnClick(e)}
          >
            Build a new trip!
          </button>
        </div>
      )}

      {tripArray.length !== 0 &&
        tripArray.map((trip) => (
          <div>
            <div
              className="container shadow p-5 mt-3 col-lg-10"
              style={{
                width: "500px",
                marginTop: "50px",
                backgroundColor: "#e0e1ccb7",
              }}
            >
              {trip.pic ? (
                <img
                  src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${trip.pic}&sensor=false&maxheight=250&maxwidth=250&key=AIzaSyCoiYtN7Xjb7P4JIpWRtlMiL9uQirs_icI`}
                />
              ) : null}
              <h3>
                <b>Your Trip to:</b> {trip.destination}
              </h3>
              <br />
              <p>
                <b>Trip name:</b> {trip.tripName}
              </p>
              <p>
                <b>Budget:</b> ${trip.budget}
              </p>
              <p>
                <b>Start Location: </b> {trip.startLocation}
              </p>
              <p>
                <b>Dates:</b> {getDateRange(trip.dates)}
              </p>
              <br />
              <button
                style={{ backgroundColor: "#b1d1b4" }}
                className="btn btn-block mt-2 p-2 shadow"
                onClick={(e) => removeTrip(e, trip._id)}
              >
                Remove Trip
              </button>
              <button
                style={{ backgroundColor: "#69ab8e" }}
                className="btn btn-block btn-success mt-2 p-2 shadow"
                onClick={(e) => updateTrip(e, trip._id)}
              >
                Update Trip
              </button>
              <Link to="/itinerary">
                <button
                  style={{ backgroundColor: "#edd769" }}
                  className="btn btn-block mt-2 p-2 shadow"
                >
                  {" "}
                  Itinerary
                </button>
              </Link>
            </div>
            <br />
          </div>
        ))}
    </div>
  );
}
