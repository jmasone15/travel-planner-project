import { React, useState } from 'react';
import SearchForm from "../Calendar/SearchForm";
import "../../css/searchForm.css"

import MapContainer from "../Calendar/MapContainer"

function Recommend(props) {




    return (
        <div>
            <SearchForm
                tripTripName={props.tripTripName}
                setTripTripName={props.setTripTripName}
                tripStartLocation={props.tripStartLocation}
                setTripStartLocation={props.setTripStartLocation}
                tripDestination={props.tripDestination}
                setTripDestination={props.setTripDestination}
                tripDates={props.tripDates}
                setTripDates={props.setTripDates}
            />

        </div>
    )
}

export default Recommend;