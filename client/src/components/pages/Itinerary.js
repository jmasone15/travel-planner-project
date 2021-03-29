import React from 'react';
import ReactToPdf from "react-to-pdf";
import "../../css/itinerary.css"
// import "./home.css";
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
        <div classNameName="bgThis">
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
                    <div className="container shadow p-3 mb-3 mt-5 bg-white rounded">
                        <div className="container">
                            <h5 className="m-0"><span className="text-muted mr-2"><i className="fa fa-plane"></i></span>Trip Info</h5>
                        </div>
                        <div className="container">
                            <div className="row mt-n3">
                                <div className="col-sm-4 mt-3"> <span>Dates:</span>
                                    <p className="font-weight-600 mb-0">{getDateRange(selectedTrip.dates)}</p>
                                </div>
                                <div className="col-sm-4 mt-3"> <span>Start Location:</span>
                                    <p className="font-weight-600 mb-0">{selectedTrip.startLocation}</p>
                                </div>
                                <div className="col-sm-4 mt-3"> <span>Budget:</span>
                                    <p className="font-weight-600 mb-0">${selectedTrip.budget}</p>
                                </div>
                                <div className="col-sm-4 mt-3"> <span>Email:</span>
                                    <p className="font-weight-600 mb-0">{profileEmail}</p>
                                </div>
                                <div className="col-sm-4 mt-3"> <span>Destination:</span>
                                    <p className="font-weight-600 mb-0">{selectedTrip.destination}</p>
                                </div>
                                <div className="col-sm-4 mt-3"> <span>Trip ID:</span>
                                    <p className="font-weight-600 mb-0">{selectedTrip._id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <div className="container shadow p-3 mb-3 mt-5 bg-white rounded">
                        <div className="container">
                            <h5 className="m-0"><span className="text-muted mr-2"><i className="fa fa-hotel"></i></span>Budget Transactions</h5>
                        </div>
                        <div className="container">
                            <div className="row mt-n3">
                                {selectedTrip.expenses.map((e) => (
                                    <div className="col-sm-4 mt-3"> <span>{e.name}</span>
                                        <p className="font-weight-600 mb-0">{e.amount}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <div className="container shadow p-3 mb-3 mt-5 bg-white rounded">
                        <div className="container">
                            <h5 className="m-0"><span className="text-muted mr-2"><i className="fa fa-hotel"></i></span>Activities</h5>
                        </div>
                        <div className="container">
                            <div className="row mt-n3">
                                {activitiesArray.map((a) => (
                                    <div className="col-sm-4 mt-3"> <span>{a.name}</span>
                                        <p className="font-weight-600 mb-0">{a.address}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <ReactToPdf targetRef={ref} filename="itinerary.pdf" scale={0.75}>
                        {({ toPdf }) => (
                            <footer className="text-center mt-3">
                                <p><strong>Four Amigos Inc.</strong><br />
                                    1600 Amphitheatre Parkway<br />
                                    Mountain View, CA 94043 </p>
                                <hr />
                                <p className="text-1"><strong>NOTE :</strong> This is computer generated itinerary and does not require physical signature.</p>
                                <div className="btn-group btn-group-sm d-print-none">
                                 {/* eslint-disable-next-line  */}
                                    <a href="javascript:window.print()" className="btn btn-light border text-black-50 shadow-none"><i className="fa fa-print"></i> Print</a>
                                </div>
                            </footer>
                        )}
                    </ReactToPdf>
                </div>
            </div>
        </div>
    )
}
