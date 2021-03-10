import React from 'react'

function ClearTransactions({onDeleteAllClick}) {
    return (
        <div className="m-1 mb-2 col-lg-12">
            <button className="btn btn-block btn-danger" onClick={onDeleteAllClick}>Clear All</button>
        </div>
    )
}

export default ClearTransactions
