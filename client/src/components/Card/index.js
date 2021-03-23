import React from "react";
import "./style.css";

function Card({className, ref, style, children}) {
    return (
        <div ref={ref} style={style} className={className}>
            <div className="card-body">{children}</div>
        </div>
    );
}

export default Card;
