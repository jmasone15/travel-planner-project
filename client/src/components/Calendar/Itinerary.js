import { React, useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useModal, Modal } from 'react-morphing-modal';
import Activities from "./Activities"
import 'react-morphing-modal/dist/ReactMorphingModal.css';
import Card from "./Card"
import { useHistory } from "react-router-dom";

function Itinerary(props) {

    let editObject;
    let datesArray;
    const [updateId, setUpdateId] = useState("");

    
 
    const { modalProps, open, close } = useModal({});
    const triggerRef = useRef(null);
    const history = useHistory();

    useEffect(() => {
        
    }, [props.activitiesArray])

    function updateValues(day) {
        console.log(day);
        props.setEditDate(day)
        open(triggerRef, {
            onOpen: async () => {
                const dbActivities = await axios.get("/api/activities/604859f5ffe63b05dc95fefb")
                
                if (dbActivities.data) {
                    datesArray = dbActivities.data.dates
                    const result = dbActivities.data.dates.filter(obj => {
                        return obj.name === day

                    })
                    console.log(result);
                    editObject = result[0]
                    await props.setActivitesArray(result[0].activities)
                }
            },
            onClose: async () => {
                console.log(props.activitiesArray);
                editObject.activities = props.activitiesArray 
                
                var foundIndex = datesArray.findIndex(x => x.name === day);
                datesArray[foundIndex] = editObject;
                console.log(datesArray);
                console.log(editObject);
                // try {
                //     await axios.put(`/api/activities/6048590dffe63b05dc95fefa`, {

                //         dates: datesArray
                //     });
                //     alert("Trip Updated");
                // } catch (err) {
                //     console.error(err)
                // }
            }

        })



    }


    return (
        <div>
            {props.props.map((day, index) => (
                <button className="contain" key={uuidv4()} ref={triggerRef} onClick={() => updateValues(day)}>
                    {day}
                </button>
            ))}
            <Modal {...modalProps}>
                {props.editDate}
                <button name="attractions" onClick={(e) => props.handleFormSubmit(e)}>Attractions</button>
                <button name="hotels" onClick={(e) => props.handleFormSubmit(e)}>Hotels</button>
                <button name="shopping" onClick={(e) => props.handleFormSubmit(e)}>Shopping</button>
                <button name="restaurants" onClick={(e) => props.handleFormSubmit(e)}>Restaurants</button>
                <div className="row">
                    <div className="col-md-4">
                        {props.showResults ? <Card activitiesArray={props.activitiesArray} setActivitesArray={props.setActivitesArray} data={props.type} /> : null}
                    </div>
                    <div className="col-md-4">
                        {props.activitiesArray.length > 0 ? <Activities activitiesArray={props.activitiesArray} setActivitesArray={props.setActivitesArray} /> : null}
                    </div>
                </div>



            </Modal>

        </div>
    )
}


export default Itinerary;