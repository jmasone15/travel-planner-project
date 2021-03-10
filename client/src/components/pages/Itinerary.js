import React from 'react';
import ReactToPdf from "react-to-pdf";
import "../../css/itinerary.css"
import "./home.css";
export default function Itinerary({ selectedTrip, profileEmail, activitiesArray }) {
    const ref = React.createRef();

    // Get First and last date
    function getDateRange(x) {
        let result = x.map(date => date.name)
        return (`${result[0]} - ${result[result.length - 1]}`)
    }

    console.log(selectedTrip);
    console.log(activitiesArray);

    return (
        <div className="bgThis">
            <div style={{ width: "500", height: "1000" }} ref={ref}>
                <div>
                    <header>
                        <div>
                            {/* <div > <img id="logo" src="../../images/dondeLogo.png" title="Donde" alt="Donde" /> </div> */}
                            <div >
                                <h4 >Travel Itinerary</h4>
                            </div>
                        </div>
                        <hr />
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
                    {/* <div class="card mt-4">
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
                    <br /><br /> */}
                    <div class="card mt-4">
                        <div class="card-header">
                            <h5 class="m-0"><span class="text-muted mr-2"><i class="fa fa-hotel"></i></span>Budget Transactions</h5>
                        </div>
                        <div class="card-body">
                            <div class="row mt-n3">
                                {selectedTrip.expenses.map((e) => (
                                    <div class="col-sm-4 mt-3"> <span>{e.name}</span>
                                        <p class="font-weight-600 mb-0">{e.amount}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <div class="card mt-4">
                        <div class="card-header">
                            <h5 class="m-0"><span class="text-muted mr-2"><i class="fa fa-hotel"></i></span>Activities</h5>
                        </div>
                        <div class="card-body">
                            <div class="row mt-n3">
                                {activitiesArray.map((a) => (
                                    <div class="col-sm-4 mt-3"> <span>{a.name}</span>
                                        <p class="font-weight-600 mb-0">{a.address}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <ReactToPdf targetRef={ref} filename="itinerary.pdf" scale={0.75}>
                        {({ toPdf }) => (
                            <footer class="text-center mt-3">
                                <p><strong>Four Amigos Inc.</strong><br />
                                    1600 Amphitheatre Parkway<br />
                                    Mountain View, CA 94043 </p>
                                <hr />
                                <p class="text-1"><strong>NOTE :</strong> This is computer generated itinerary and does not require physical signature.</p>
                                <div class="btn-group btn-group-sm d-print-none">
                                    <a href="javascript:window.print()" class="btn btn-light border text-black-50 shadow-none"><i class="fa fa-print"></i> Print</a>
                                </div>
                            </footer>
                        )}
                    </ReactToPdf>
                </div>
            </div>
        </div >
    )
}
