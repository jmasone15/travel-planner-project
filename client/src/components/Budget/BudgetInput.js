import React, { useState, useRef, useEffect } from "react";
import numeral from "numeral";
import { SaveBudget } from ".";

function BudgetInput({ onChange, putTotalBudget, save }) {
  const [userBudget, setUserBudget] = useState("");

  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();
  }, [])


  const handleClick = (event) => {
    event.preventDefault();
    onChange(numeral(userBudget).value());
    putTotalBudget(numeral(userBudget).value());
    setUserBudget(0);
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="input col-lg-5">
        <form className="budgetInputPosition">
          <input
            ref={inputEl}
            id="budget"
            type="text"
            className="form-control curvedInput shadow"
            placeholder="Enter Budget?"
            aria-label="Enter Budget?"
            aria-describedby="basic-addon2"
            onChange={(event) => setUserBudget(event.target.value)}
            value={userBudget}
          />
          {numeral.validate(userBudget) && (
            <div className="input-group-append d-flex justify-content-center">
              <button
                className="btn btn-block btn-success mt-2 p-2 shadow "
                onClick={handleClick}
                disabled={!numeral.validate(userBudget)}
              >
                Continue To Add Expense
              </button>
              <SaveBudget save={save} className="btn btn-block btn-secondary" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default BudgetInput;
