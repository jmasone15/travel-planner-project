import { React, useRef } from 'react';
// import {useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import styled from "styled-components";
import { useModal, Modal } from 'react-morphing-modal';
import Activities from "./../Activities"
import 'react-morphing-modal/dist/ReactMorphingModal.css';

function Itinerary(props) {


    const { modalProps, open } = useModal();
    const triggerRef = useRef(null);
    // const [showmodal, setShowModal] = useState(false);

    // useEffect(() => {

    // }, [showmodal])
    // const openModal = () => {
    //     console.log(showmodal);
    //     setShowModal((prev) => !prev);
    // }

    function updateValues(day) {
        props.setEditDate(day)
        open(triggerRef);

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
                <div className="row">
                    <div className="col-md-2">
                        
                    </div>
                    <div className="col-md-8">
                        <Activities />
                    </div>
                </div>



            </Modal>

        </div>
    )
}

export default Itinerary;