import React from "react";

function Card(props) {
    console.log(props);
    return (
        <div>
            {props.data.map((place, index) => (
                <div>
                    <div className="col-md-4">
                        {place.photos ?
                            <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${place.photos[0].photo_reference}&sensor=false&maxheight=480&maxwidth=720&key=AIzaSyCoiYtN7Xjb7P4JIpWRtlMiL9uQirs_icI`} />
                            : null}
                    </div>
                    <div className="col-md-4">
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
                        <button key={place.reference} value={{name: place.name, location: place.geometry.location, address: place.formatted_address}}>Add to itenerary</button>
                        </div>
                </div>
            ))}
        </div>
    )
}

export default Card;