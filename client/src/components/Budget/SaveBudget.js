import React from 'react'

function SaveBudget({save, className}) {

    return (
        <button className={className} onClick={save}>
        Save Budget to Trip
      </button>
    )
}

export default SaveBudget
