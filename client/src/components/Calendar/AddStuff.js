import { React, useState } from 'react';


function AddStuff(props) {

    const [activityName, setActivityName] = useState("")
    const [address, setAddress] = useState("")

    function handleBtnClick() {
        let myDay = {...props.currentTrip.days[props.editDate]}

        myDay.activities.push({activityName: activityName, address: address})

    }


    return (
        <div>
            <input placeholder={"Activity name"} className="addActivities" onChange={(e) => setActivityName(e.target.value)} />
            <input placeholder={"Address"} className="giveAddress" onChange={(e) => setAddress(e.target.value)} />
            <button onClick={() => handleBtnClick()} type="button">Add</button>
        </div>
    )
}

export default AddStuff;