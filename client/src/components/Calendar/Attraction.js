import React from 'react'
import StarRatings from 'react-star-ratings';

export default function Attraction({ title, geo, refs, img, rating, address, id, userRatings, btnClick }) {

    return (
        <div>
            <div className="row" key={id} style={{ paddingBottom: "20px", paddingTop: "20px", textAlign: "center", justifyContent: "center" }}>
                <h3>{title}</h3>
                {img ?
                    <img style={{ width: "750px", height: "500px" }} src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${img[0].photo_reference}&sensor=false&maxheight=1920&maxwidth=1080&key=AIzaSyCoiYtN7Xjb7P4JIpWRtlMiL9uQirs_icI`} />
                    : ""}
                <div style={{ marginTop: "10px" }}>
                    {/* <h5>Rating: {attractionRating}</h5> */}
                    <StarRatings rating={rating} 
                    starDimension="30px"
                    starSpacing="7px"
                    starRatedColor="#69ab8e" />
                    <p>Rating: {rating}</p>
                    <p>Reviews: {userRatings}</p>
                    <p>{address}</p>
                    <button className="btn btn-primary mt-2 p-2 shadow" onClick={() => btnClick(title, geo, address, refs)} >Add to itenerary</button>
                </div>
            </div>
        </div>
    )
}
