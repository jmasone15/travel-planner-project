import React from "react";
import "./style.css";

function Card(props) {
    return (
        <div ref={props.ref} style={props.style} className="card shadow p-3 mb-3` bg-white rounded">
            <div className="card-body">{props.children}</div>
        </div>
    );
}

export default Card;
