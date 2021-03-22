import numeral from "numeral";
import React, { useState, useEffect, useRef } from "react";

function ModifyBudget({
  addToBudgetClick,
  subtractFromBudgetClick,
  addToTotalBudgetClick,
  subtractFromTotalBudgetClick,
  clearModify,
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

  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  if (userModifyBudget === 0) {
    return null;
  }

  return (
    <div className="mb-3 d-flex justify-content-center">
      <div className="form-group col-lg-8 col-md-12 shadow p-3">
        <div className="row p-3">
          
          {/* Input for Modifying Budget */}
          <label className="labelText" for="expenseAmount">
            Modify your budget
          </label>
          <input
            ref={inputEl}
            id="budget"
            type="text"
            className="form-control curvedInput"
            placeholder="$0.00"
            aria-label="Enter amount"
            aria-describedby="basic-addon2"
            onChange={(event) => setUserModifyBudget(event.target.value)}
            value={userModifyBudget}
          />
        </div>

        <div className="row">
          <div className="col-6">
            {/* Add to Budget */}
            <button
              className={
                !numeral.validate(userModifyBudget)
                  ? "btn btn-block btn-outline-secondary noCurveBtn"
                  : "btn btn-block btn-success noCurveBtn"
              }
              type="button"
              onClick={handleAddClick}
              disabled={!numeral.validate(userModifyBudget)}
            >
              <i class="fas fa-plus"></i>
            </button>
          </div>
          <div className="col-6">
            {/* Subtract from Budget */}
            <button
              className={
                !numeral.validate(userModifyBudget)
                  ? "btn btn-block btn-outline-secondary noCurveBtn"
                  : "btn btn-block btn-danger noCurveBtn"
              }
              type="button"
              onClick={handleSubtractClick}
              disabled={!numeral.validate(userModifyBudget)}
            >
              <i class="fas fa-minus"></i>
            </button>
          </div>
        </div>
      </div>
      <div>
        <button onClick={clearModify} className="btn">
          <i class="fas fa-ban fa-2x text-danger"></i>
        </button>
      </div>
    </div>
  );
}

export default ModifyBudget;
