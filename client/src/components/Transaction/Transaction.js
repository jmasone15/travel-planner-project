import numeral from "numeral";
import React from "react";

function Transaction({ name, amount, onDeleteClick }) {
  return (
    <div className="row d-flex justify-content-between tList bg-white border m-2">
      <div className="col-lg-5 border center-text bg-white font-weight-bold py-2">{name}</div>
      <div className="col-lg-5 border center-text bg-white py-2">{numeral(amount).format("$0,0.00")}</div>
      <div className="col-lg-2 border center-text d-flex justify-content-end bg-light">
        <button className="btn btn-lg btn-outline" type="button" onClick={onDeleteClick}><i class="far fa-trash-alt fa-lg"></i></button>
      </div>
    </div>
  );
}

export default Transaction;