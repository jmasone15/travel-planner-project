import React, { useState } from "react";
import numeral from "numeral";

function BudgetInput({ onChange, putTotalBudget }) {
  const [userBudget, setUserBudget] = useState("");

  const handleClick = () => {
    onChange(numeral(userBudget).value());
    putTotalBudget(numeral(userBudget).value());
    setUserBudget(0);
  };

  return (
    <div className="d-flex justify-content-center budgetInputPosition">
      <div className="input col-lg-8">
        <div className="">
          <input
            id="budget"
            type="text"
            className="form-control curvedInput"
            placeholder="What's your Budget?"
            aria-label="What's your Budget?"
            aria-describedby="basic-addon2"
            onChange={(event) => setUserBudget(event.target.value)}
            value={userBudget}
          />
          <div className="input-group-append d-flex justify-content-end">
            <button
              // className="btn btn-outline-success mt-2 p-1 noCurveBtn"
              className= {!numeral.validate(userBudget)? "displayHidden" : "btn btn-success mt-2 p-2 shadow pulse"}
              type="button"
              onClick={handleClick}
              disabled={!numeral.validate(userBudget)}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BudgetInput;
