import {React, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

function MyCard(props) {

    const [newActivity, setNewActivity] = useState({})

    useEffect(() => {
        
    }, [props.activitiesArray])


    async function handleBtnClick(name, location, address, photo_reference) {

        await setNewActivity({name, location, address, photo_reference, id: uuidv4()})
        setActs()
        

    }

    async function setActs() {
        await props.setActivitiesArray([...props.activitiesArray, newActivity])
    }
    return (
        <div>
            {props.data.map((place, index) => (
                <div>
                    <div className="row" style={{paddingBottom: "20px", paddingTop: "20px"}}>
                    <div className="col-md-3">
                    {place.photos ?
                            <img  src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${place.photos[0].photo_reference}&sensor=false&maxheight=250&maxwidth=250&key=AIzaSyCoiYtN7Xjb7P4JIpWRtlMiL9uQirs_icI`} />
                            : null}
                    </div>
                    <div className="col-md-8" style={{paddingLeft: "90px"}}>
                    <h3>{place.name}</h3>
                    <h6>Rating: {place.rating}</h6> <p>Reviews: {place.user_ratings_total}</p>
                    <p>{place.formatted_address}</p>
                    <button key={place.reference} onClick={() => handleBtnClick(place.name, place.geometry.location, place.formatted_address, place.photos[0].photo_reference)}>Add to itenerary</button>
                    </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyCard;