import React from "react";
import "./routeCard.css";
// import { Link } from "react-router-dom";

function RouteCard(props) {
  return (
    // <div ref={props.ref} style={props.style} className="card shadow mb-3 mt-5 bg-white rounded">
    //     <img src={props.src} className="card-img-top" alt={props.alt} />
    //     <div className="card-body text-center">
    //         <h1 className="card-title ">{props.title}</h1>
    //         <p className="card-text"> {props.text}</p>
    //         <button className="btn btn-warning"> {props.location} </button>
    //     </div>
    // </div>

    <div className="card-wrapper col-lg-12 col-md-12 mt-5 col-xs-12" ref={props.ref}>
      <div className="card shadow">
        <div className="card-img-wrapper">
          <img
                      className="card-img-top"
                      src={props.src}
            // src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1908&q=80"
            alt="Card img cap"
          />
        </div>
        <div className="card-body">
          <h3 className="card-title text-center">{props.title}</h3>
          <div className="card-content">
            <p className="card-text">
              {props.text}
            </p>
                   {props.children}   
          </div>
        </div>
      </div>
    </div>
  );
}

export default RouteCard;