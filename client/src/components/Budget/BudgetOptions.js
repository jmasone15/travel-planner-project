import React, { useState } from "react";
import { SaveBudget } from ".";

function BudgetOptions({ reset, showModify, save }) {
  const handleResetClick = () => {
    reset();
  };

  const handleModifyClick = () => {
    showModify();
  };

  return (
    <div className="row d-flex justify-content-center mb-2">
      <div className="col-lg-1 col-md-1 col-sm-12 mx-2 d-flex justify-content-center">
        <button className="btn btn-light" onClick={handleResetClick}>
          <i className="fas fa-redo-alt fa-lg text-danger"></i>
          <span className="text-dark"> Reset</span>
        </button>
      </div>
      <div className="col-lg-1 col-md-1 col-sm-12 mx-2 d-flex justify-content-center">
        <button className="btn btn-light text-dark" onClick={handleModifyClick}>
          <i className="fas fa-edit"></i> Modify Budget
        </button>
      </div>
      <div className="col-lg-1 col-md-1 col-sm-12 mx-2 d-flex justify-content-center">
        <SaveBudget save={save} className="btn btn-light" />
      </div>
    </div>
  );
}

export default BudgetOptions;
