import React, { useContext, useEffect, useState } from 'react';
import "../../css/budget.css";
import Card from "../Card";
import axios from "axios";
import ReactToPdf from "react-to-pdf";
import UserContext from "../../context/UserContext";
import "../../css/itinerary.css"
import "./home.css";

function ItineraryPage() {
    const { userId } = useContext(UserContext);
    const [tripArray, setTripArray] = useState([]);
    const [selectedTrip, setSelectedTrip] = useState({});
    const [showPDF, setShowPDF] = useState(false);
    const [showActs, setShowActs] = useState(false);
    const [profileEmail, setProfileEmail] = useState("");

    async function getUserData() {
        const userData = await axios.get(`user/profile/${userId}`);
        setProfileEmail(userData.data.email)
    }

    async function getTripData() {
        const userTrips = await axios.get(`api/${userId}`)
        setTripArray(userTrips.data);
        console.log(userTrips.data)
    }

    async function getSelectedTrip(e, id) {
        const sTrip = await axios.get(`/api/trip/${id}`)
        setSelectedTrip(sTrip.data);
        setShowPDF(true);
        setShowActs(true);
    }

    // Get Array of dates 
    // function getAllDates(x, y) {
    //     const response = [];
    //     for (let i = 0; i < x.length; i++) {
    //         response.push(x[i][y])
    //         return response;
    //     }
    // }

    // Get First and last date
    function getDateRange(x) {
        let result = x.map(date => date.name)
        return (`${result[0]} - ${result[result.length - 1]}`)
    }

    useEffect(() => {
        getUserData();
        getTripData();
    }, []);
    return (
        <div className="bg">
            <div
                className="card shadow p-3 mb-5 bg-white rounded"
            >
                <div className="card-body">
                    <h1 className="text-center font">Itinerary</h1>
                    <Card style={{ backgroundColor: "#E0E1CC" }}>
                        <h5 className="p">Which trip do you want to build out?</h5>
                        <div>
                            <ul>
                                {tripArray.map((trip) => (
                                    <li className="p" onClick={(e) => getSelectedTrip(e, trip._id)} key={trip._id}>Trip to: {trip.destination}</li>
                                ))}
                            </ul>
                        </div>
                    </Card>
                </div>
                {showActs ? <div className="card-body">
                    <Card style={{ backgroundColor: "#E0E1CC" }}>
                        <div style={{ textAlign: "center" }}>
                            <h3 className="text-center font">Activities in your destination area!</h3>
                            <button>Activities</button><button>Restaurant</button><button>Entertainment</button><button>Night Life</button>
                        </div>
                        <div>
                            <ul>
                                <li className="p">Activity</li>
                                <li className="p">Activity</li>
                                <li className="p">Activity</li>
                            </ul>
                        </div>

                    </Card>
                </div> : ""}
            </div>
            {showPDF ?
                <ReactToPdf>
                    {({ toPdf, targetRef }) => (
                        <div style={{ width: 1200, margin: "auto", marginBottom: "50px" }}>
                            <main className="bgThis">
                                <header>
                                    <div class="row align-items-center">
                                        <div class="col-sm-7 text-center text-sm-left mb-3 mb-sm-0"> <img id="logo" src="../../images/dondeLogo.png" title="Donde" alt="Donde" /> </div>
                                        <div class="col-sm-5 text-center text-sm-right">
                                            <h4 class="text-7 mb-0">Travel Itinerary</h4>
                                        </div>
                                    </div>
                                    <hr class="my-4" />
                                </header>
                                <br /><br />
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="m-0"><span class="text-muted mr-2"><i class="fa fa-plane"></i></span>Trip Info</h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="row mt-n3">
                                            <div class="col-sm-4 mt-3"> <span>Dates:</span>
                                                <p class="font-weight-600 mb-0">{getDateRange(selectedTrip.dates)}</p>
                                            </div>
                                            <div class="col-sm-4 mt-3"> <span>Start Location:</span>
                                                <p class="font-weight-600 mb-0">{selectedTrip.startLocation}</p>
                                            </div>
                                            <div class="col-sm-4 mt-3"> <span>Budget:</span>
                                                <p class="font-weight-600 mb-0">${selectedTrip.budget}</p>
                                            </div>
                                            <div class="col-sm-4 mt-3"> <span>Email:</span>
                                                <p class="font-weight-600 mb-0">{profileEmail}</p>
                                            </div>
                                            <div class="col-sm-4 mt-3"> <span>Destination:</span>
                                                <p class="font-weight-600 mb-0">{selectedTrip.destination}</p>
                                            </div>
                                            <div class="col-sm-4 mt-3"> <span>Trip ID:</span>
                                                <p class="font-weight-600 mb-0">{selectedTrip._id}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br /><br />
                                <div class="card mt-4">
                                    <div class="card-header">
                                        <h5 class="m-0"><span class="text-muted mr-2"><i class="fa fa-hotel"></i></span>Hotel</h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="row mt-n3">
                                            <div class="col-sm-4 mt-3"> <span>Hotel Name:</span>
                                                <p class="font-weight-600 mb-0">The Orchid Hotel</p>
                                            </div>
                                            <div class="col-sm-4 mt-3"> <span>Check In:</span>
                                                <p class="font-weight-600 mb-0">16 Jun 21, Sat</p>
                                            </div>
                                            <div class="col-sm-4 mt-3"> <span>Check Out:</span>
                                                <p class="font-weight-600 mb-0">18 Jun 21, Sat</p>
                                            </div>
                                            <div class="col-sm-4 mt-3"> <span>Room No:</span>
                                                <p class="font-weight-600 mb-0">342</p>
                                            </div>
                                            <div class="col-sm-4 mt-3"> <span>Booking No:</span>
                                                <p class="font-weight-600 mb-0">HQM3912704</p>
                                            </div>
                                            <div class="col-sm-4 mt-3"> <span>Address:</span>
                                                <p class="font-weight-600 mb-0">Plot No.3, Nr. HDFC Bank, Ashram Road, Ahmedabad, Gujarat, India.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br /><br />
                                <div class="card mt-4">
                                    <div class="card-header">
                                        <h5 class="m-0"><span class="text-muted mr-2"><i class="fa fa-hotel"></i></span>Budget Transactions</h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="row mt-n3">
                                            <div class="col-sm-4 mt-3"> <span>Hotel Name:</span>
                                                <p class="font-weight-600 mb-0">The Orchid Hotel</p>
                                            </div>
                                            <div class="col-sm-4 mt-3"> <span>Check In:</span>
                                                <p class="font-weight-600 mb-0">16 Jun 21, Sat</p>
                                            </div>
                                            <div class="col-sm-4 mt-3"> <span>Check Out:</span>
                                                <p class="font-weight-600 mb-0">18 Jun 21, Sat</p>
                                            </div>
                                            <div class="col-sm-4 mt-3"> <span>Room No:</span>
                                                <p class="font-weight-600 mb-0">342</p>
                                            </div>
                                            <div class="col-sm-4 mt-3"> <span>Booking No:</span>
                                                <p class="font-weight-600 mb-0">HQM3912704</p>
                                            </div>
                                            <div class="col-sm-4 mt-3"> <span>Address:</span>
                                                <p class="font-weight-600 mb-0">Plot No.3, Nr. HDFC Bank, Ashram Road, Ahmedabad, Gujarat, India.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card mt-4">
                                    <div class="card-header">
                                        <h5 class="m-0"><span class="text-muted mr-2"><i class="fa fa-hotel"></i></span>Activities</h5>
                                    </div>
                                    <div class="card-body">
                                        <div class="row mt-n3">
                                            <div class="col-sm-4 mt-3"> <span>Hotel Name:</span>
                                                <p class="font-weight-600 mb-0">The Orchid Hotel</p>
                                            </div>
                                            <div class="col-sm-4 mt-3"> <span>Check In:</span>
                                                <p class="font-weight-600 mb-0">16 Jun 21, Sat</p>
                                            </div>
                                            <div class="col-sm-4 mt-3"> <span>Check Out:</span>
                                                <p class="font-weight-600 mb-0">18 Jun 21, Sat</p>
                                            </div>
                                            <div class="col-sm-4 mt-3"> <span>Room No:</span>
                                                <p class="font-weight-600 mb-0">342</p>
                                            </div>
                                            <div class="col-sm-4 mt-3"> <span>Booking No:</span>
                                                <p class="font-weight-600 mb-0">HQM3912704</p>
                                            </div>
                                            <div class="col-sm-4 mt-3"> <span>Address:</span>
                                                <p class="font-weight-600 mb-0">Plot No.3, Nr. HDFC Bank, Ashram Road, Ahmedabad, Gujarat, India.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <footer class="text-center mt-3">
                                    <p><strong>Four Amigos Inc.</strong><br />
                                    1600 Amphitheatre Parkway<br />
                                    Mountain View, CA 94043 </p>
                                    <hr />
                                    <p class="text-1"><strong>NOTE :</strong> This is computer generated itinerary and does not require physical signature.</p>
                                    <div class="btn-group btn-group-sm d-print-none"> <a href="javascript:window.print()" class="btn btn-light border text-black-50 shadow-none"><i class="fa fa-print"></i> Print</a> <a onClick={toPdf} ref={targetRef} class="btn btn-light border text-black-50 shadow-none"><i class="fa fa-download"></i> Download</a> </div>
                                </footer>
                            </main>
                        </div>
                    )}
                </ReactToPdf> : ""}

        </div>
    )
}

export default ItineraryPage;
