import { React, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Itinerary(props) {

    

    function updateValues(index) {
        props.setEditDate(index)        
    }

    return (
        <div>
            {props.props.map((day, index) => (
                <div className="contain" key={uuidv4()} style={{borderStyle:"solid"}} onClick={() => updateValues(index)}>
                    <h4>{day}</h4>
                </div>
            ))}
        </div>
    )
}


export default Itinerary;