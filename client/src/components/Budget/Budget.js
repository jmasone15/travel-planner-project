import React from "react";
import numeral from "numeral";

// Displays Budget and Balance
function Budget({ budget, balance }) {
  return (
    <div className="row d-flex justify-content-center">
      {/* Budget */}
      <div className="d-flex justify-content-around">
        <h3>Budget: {numeral(budget).format('$0,0.00')}</h3>
      </div>
      {/* Balance */}
      <div className="d-flex justify-content-center">
        <h5 className={balance < 0 ? "belowBudget text-danger" : "text-dark"} >Balance: <span className={balance < 0 ? "text-danger" : "text-success"}>{numeral(balance).format('$0,0.00')}</span></h5>
      </div>
    </div>
  );
}

export default Budget;
