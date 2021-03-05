import React, { useState } from "react";

function ModifyBudget({
  addToBudgetClick,
  subtractFromBudgetClick,
  addToTotalBudgetClick,
  subtractFromTotalBudgetClick,
}) {
  const [userModifyBudget, setUserModifyBudget] = useState("");

  const handleAddClick = () => {
    addToBudgetClick(parseInt(userModifyBudget));
    addToTotalBudgetClick(parseInt(userModifyBudget));
    setUserModifyBudget("");
  };

  const handleSubtractClick = () => {
    subtractFromBudgetClick(parseInt(userModifyBudget));
    subtractFromTotalBudgetClick(parseInt(userModifyBudget));
    setUserModifyBudget("");
  };

  if (userModifyBudget === 0) {
    return null;
  }

  return (
    <div className="input-group mb-3 mt-5">
      <div className="col-lg-8">
        <input
          id="budget"
          type="text"
          className="form-control"
          placeholder="Modify your budget."
          aria-label="Modify your budget."
          aria-describedby="basic-addon2"
          onChange={(event) => setUserModifyBudget(event.target.value)}
          value={userModifyBudget}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-success"
            type="button"
            onClick={handleAddClick}
            disabled={!userModifyBudget || isNaN(userModifyBudget)}
          >
            Add
          </button>
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={handleSubtractClick}
            disabled={!userModifyBudget || isNaN(userModifyBudget)}
          >
            Subtract
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModifyBudget;
