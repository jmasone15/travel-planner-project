import React from "react";

function Transaction({ name, amount, onDeleteClick }) {
  return (
    <div className="row d-flex justify-content-between border">
      <div className="col-lg-3">{name}</div>
      <div className="col-lg-3">${amount}</div>
      <div className="col-lg-3">
        <button type="button" onClick={onDeleteClick}>delete</button>
      </div>
    </div>
  );
}

export default Transaction;
