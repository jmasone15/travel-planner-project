import React from 'react'

function SaveBudget({save, className}) {

    return (
        <button className={className} onClick={save}>
        Save Budget to Trip <i class="far fa-share-square"></i>
      </button>
    )
}

export default SaveBudget
