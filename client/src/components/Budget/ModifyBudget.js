import numeral from "numeral";
import React, { useState, useEffect, useRef } from "react";

function ModifyBudget({
  addToBudgetClick,
  subtractFromBudgetClick,
  addToTotalBudgetClick,
  subtractFromTotalBudgetClick,
  clearModify,
  totalBudget
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
      <div className="col-lg-8 col-md-12 shadow p-3 yellowBg rounded">
      <div className="d-flex justify-content-end p-0">
        <button onClick={clearModify} className="btn">
          <i class="fas fa-times"></i>
        </button>
        </div>
        {/* Input for Modifying Budget */}
        <label className="labelText">Modify your budget</label>
        <div className="input-group">
        <input
          ref={inputEl}
          id="budget"
          type="text"
          className="form-control curvedInput"
          placeholder="$0.00"
          aria-label="$0.00"
          aria-describedby="basic-addon2"
          onChange={(event) => setUserModifyBudget(event.target.value)}
          value={userModifyBudget}
        />
        <div className="input-group-append">
          {/* Add to Budget */}
          <button
            className={
              !numeral.validate(userModifyBudget)
                ? "btn btn-outline-secondary noCurveBtn"
                : "btn btn-success noCurveBtn"
            }
            type="button"
            onClick={handleAddClick}
            disabled={!numeral.validate(userModifyBudget)}
          >
            <i class="fas fa-plus"></i>
          </button>

          {/* Subtract from Budget */}
          <button
            className={
              !numeral.validate(userModifyBudget) || userModifyBudget >= totalBudget
                ? "btn btn-outline-secondary noCurveBtn"
                : "btn btn-danger noCurveBtn"
            }
            type="button"
            onClick={handleSubtractClick}
            disabled={!numeral.validate(userModifyBudget) || userModifyBudget >= totalBudget}
          >
            <i class="fas fa-minus"></i>
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

export default ModifyBudget;
