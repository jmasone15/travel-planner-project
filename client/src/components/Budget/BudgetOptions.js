import React, { useState } from "react";

function BudgetOptions({ reset, showModify }) {
  const handleResetClick = () => {
    reset();
  };

  const handleModifyClick = () => {
    showModify();
  };

  return (
    <div className="d-flex justify-content-center">
      <button className="btn btn-outline-light" onClick={handleResetClick}>
        <i className="fas fa-redo-alt fa-lg text-danger"></i>
        <span className="text-dark"> Reset</span>
      </button>
      <button
        className="btn btn-outline-light text-dark"
        onClick={handleModifyClick}
      >
        <i className="fas fa-edit"></i> Modify Budget
      </button>
    </div>
  );
}

export default BudgetOptions;
