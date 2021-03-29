import React, { Fragment, useState } from "react";
import { SaveBudget } from ".";

function BudgetOptions({ reset, showModify, save }) {
  const handleResetClick = () => {
    reset();
  };

  const handleModifyClick = () => {
    showModify();
  };

  return (
    <Fragment>
      <div className="row d-flex justify-content-center mb-2">
        <div className="col-lg-1 col-md-1 col-sm-12 mx-2 d-flex justify-content-center">
          <button className="btn" onClick={handleResetClick}>
            <i className="fas fa-redo-alt fa-lg text-danger"></i>
            <span className="text-dark"> Reset</span>
          </button>
        </div>
        <div className="col-lg-1 col-md-1 col-sm-12 mx-2 d-flex justify-content-center">
          <button className="btn text-dark" onClick={handleModifyClick}>
            <i className="fas fa-edit"></i> Modify Budget
          </button>
        </div>
      </div>
      <div className="row d-flex justify-content-center mb-3">
        <div className="col-lg-6 col-md-6">
          <SaveBudget save={save} className="btn btn-block btn-primary" />
        </div>
      </div>
    </Fragment>
  );
}

export default BudgetOptions;
