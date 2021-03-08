import React from "react";

function BudgetOptions({reset}) {

    const handleResetClick = ()=>{
        reset()
    }

  return (
    <div className="d-flex justify-content-center">
      <button className="btn btn-outline-light" onClick={handleResetClick}>
        <i className="fas fa-redo-alt fa-lg text-danger"></i>
        <span className="text-dark"> Reset</span>
      </button>
    </div>
  );
}

export default BudgetOptions;
