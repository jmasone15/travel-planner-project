import React from "react";
import "./routeCard.css";
import { Link } from "react-router-dom";

function RouteCard(props) {
  return (
    <div
      className="card-wrapper mt-5 col-xs-12"
      ref={props.ref}
    >
      <div className="card">
        <div className="card-img-wrapper">
          <img className="card-img-top" src={props.src} alt="Card img cap" />
        </div>
        <div className="card-body">
          <h5 className="card-title text-center">{props.title}</h5>
          <div className="card-content">
            <p className="card-text">{props.text}</p>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RouteCard;
