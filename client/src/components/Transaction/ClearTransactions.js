import React from 'react'

function ClearTransactions({onDeleteAllClick}) {
    return (
        <div className="d-flex justify-content-end m-1 mb-2">
            <button className="btn btn-outline-danger py-1" onClick={onDeleteAllClick}>Clear Expenses</button>
        </div>
    )
}

export default ClearTransactions
