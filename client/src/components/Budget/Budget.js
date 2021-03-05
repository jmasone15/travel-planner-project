import React from "react";

// Displays Budget and Balance
function Budget({ budget, balance }) {
  return (
    <div className="row">
      {/* Budget */}
      <div className="col-lg-3">
        <h3>Budget: ${budget}</h3>
      </div>
      {/* Balance */}
      <div className="col-lg-3">
        <h3>Balance: ${balance}</h3>
      </div>
    </div>
  );
}

export default Budget;
