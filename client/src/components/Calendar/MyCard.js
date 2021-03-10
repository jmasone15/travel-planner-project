import React from "react";

function MyCard(props) {
    console.log(props);
    return (
        <div>
            {props.data.map((place, index) => (
                <div>
                    <div className="row" style={{paddingBottom: "20px"}}>
                    <div className="col-md-3">
                    {place.photos ?
                            <img  src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${place.photos[0].photo_reference}&sensor=false&maxheight=250&maxwidth=250&key=AIzaSyCoiYtN7Xjb7P4JIpWRtlMiL9uQirs_icI`} />
                            : null}
                    </div>
                    <div className="col-md-8" style={{paddingLeft: "40px"}}>
                    <h3>{place.name}</h3>
                    <h4>Rating: {place.rating}</h4> <p>Reviews: {place.user_ratings_total}</p>
                    <p>{place.formatted_address}</p>
                    <button key={place.reference} value={{name: place.name, location: place.geometry.location, address: place.formatted_address}}>Add to itenerary</button>
                    </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyCard;