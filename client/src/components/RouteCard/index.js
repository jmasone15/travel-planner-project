import React from "react";
import "./routeCard.css";
import { Link } from "react-router-dom";

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

    <div class="card-wrapper col-lg-12 col-md-12 mt-5 col-xs-12" ref={props.ref}>
      <div class="card">
        <div class="card-img-wrapper">
          <img
                      class="card-img-top"
                      src={props.src}
            // src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1908&q=80"
            alt="Card image cap"
          />{" "}
        </div>
        <div class="card-body">
          <h5 class="card-title text-center">{props.title}</h5>
          <div class="card-content">
            <p class="card-text">
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