import numeral from "numeral";
import React, { useState } from "react";


function ModifyBudget({
  addToBudgetClick,
  subtractFromBudgetClick,
  addToTotalBudgetClick,
  subtractFromTotalBudgetClick,
}) {
  const [userModifyBudget, setUserModifyBudget] = useState("");

  const handleAddClick = () => {
    addToBudgetClick(numeral(userModifyBudget).value());
    addToTotalBudgetClick(numeral(userModifyBudget).value());
    setUserModifyBudget("");
  };

  const handleSubtractClick = () => {
    subtractFromBudgetClick(numeral(userModifyBudget).value());
    subtractFromTotalBudgetClick(numeral(userModifyBudget).value());
    setUserModifyBudget("");
  };

  if (userModifyBudget === 0) {
    return null;
  }

  return (
    <div className="input-group my-3 d-flex justify-content-center">
      <div className="col-lg-8">
        {/* Input for Modifying Budget */}
        <input
          id="budget"
          type="text"
          className="form-control curvedInput shadow"
          placeholder="Modify your budget."
          aria-label="Modify your budget."
          aria-describedby="basic-addon2"
          onChange={(event) => setUserModifyBudget(event.target.value)}
          value={userModifyBudget}
        />
        <div className="input-group-append d-flex justify-content-end mt-2">
          {/* Add to Budget */}
          <button
            className={!numeral.validate(userModifyBudget)?"displayHidden" : "btn btn-outline-success noCurveBtn"}
            type="button"
            onClick={handleAddClick}
            disabled={!numeral.validate(userModifyBudget)}
          >
            <i class="fas fa-plus"></i>
          </button>

          {/* Subtract from Budget */}
          <button
            className={!numeral.validate(userModifyBudget)?"displayHidden" : "btn btn-outline-danger noCurveBtn"}
            type="button"
            onClick={handleSubtractClick}
            disabled={!numeral.validate(userModifyBudget)}
          >
            <i class="fas fa-minus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModifyBudget;
