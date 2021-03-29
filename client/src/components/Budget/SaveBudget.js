import React from 'react'

function SaveBudget({save, className}) {

    return (
      <button className={className} onClick={save}
      style={{backgroundColor:"#69ab8e"}} >
        Save Budget to Trip <i className="far fa-share-square"></i>
      </button>
    )
}

export default SaveBudget
