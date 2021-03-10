import {React, useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

function Card(props) {

    const [newActivity, setNewActivity] = useState({})

    useEffect(() => {
        
    }, [props.activitiesArray])

    async function handleBtnClick(name, location, address, photo_reference) {
        console.log(name, location, address);
        setNewActivity({name, location, address, photo_reference, id: uuidv4()})
        
        await props.setActivitesArray([...props.activitiesArray, newActivity])


        // const newData = props.activitiesArray.map(obj => {
        //     if(obj.fieldName === 'cityId') // check if fieldName equals to cityId
        //        return {
        //          ...obj,
        //          valid: true,
        //          description: 'You can also add more values here' // Example of data extra fields
        //        }
        //     return obj
        //   });
    }

    console.log(props);
    return (
        <div>
            {props.data.map((place, index) => (
                <div>
                    <div className="col-md-4">
                        {place.photos ?
                            <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${place.photos[0].photo_reference}&sensor=false&maxheight=150&maxwidth=150&key=AIzaSyCoiYtN7Xjb7P4JIpWRtlMiL9uQirs_icI`} />
                            : null}
                    </div>
                    <div className="col-md-8">
                        <div className="row">
                            <h3>{place.name}</h3>
                        </div>
                        <div className="row">
                            <p>{place.formatted_address}</p>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <h4>{place.rating}</h4>
                    </div>
                    <div className="col-md-2">
                        <p>Reviews: {place.user_ratings_total}</p>
                    </div>
                    <div className="row">
                        <button key={place.reference} onClick={() => handleBtnClick(place.name, place.geometry.location, place.formatted_address, place.photos[0].photo_reference)}>Add to itenerary</button>
                        </div>
                </div>
            ))}
        </div>
    )
}

export default Card;