import React, { useState } from "react";

function BudgetInput({ onChange, putTotalBudget }) {
  const [userBudget, setUserBudget] = useState("");

const handleClick = () => {
  onChange(parseInt(userBudget))
  putTotalBudget(parseInt(userBudget))
  setUserBudget(0);
}

  return (
    <div className="input-group mb-3 mt-5">
      <div className="col-lg-8">
        <input
          id="budget"
          type="text"
          className="form-control"
          placeholder="What is your Budget?"
          aria-label="What is your Budget?"
          aria-describedby="basic-addon2"
          onChange={(event) => setUserBudget(event.target.value)}
          value={userBudget}
        />
        <div className="input-group-append">
         <button
            className="btn btn-outline-success"
            type="button"
            onClick={handleClick}
            disabled={!userBudget || isNaN(userBudget)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default BudgetInput;
