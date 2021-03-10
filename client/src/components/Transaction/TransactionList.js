import React from "react";
import { Transaction, ClearTransactions } from ".";

function TransactionList({
  listOfTransactions,
  onDeleteClick,
  onDeleteAllClick,
}) {
  if (listOfTransactions.length === 0) {
    return null;
  }

  return (
    <>
      <div className="col-lg-12 p-1 shadow centerX tList">
        <div className="col-lg-12">
          {/* <div className="row d-flex justify-content-between tList bg-white border m-2">
            <div className="col-lg-5 border-right px-2 center-text font-weight-bold">Expense</div>
            <div className="col-lg-4 border-right px-2 center-text font-weight-bold">Amount</div>
            <div className="col-lg-3 centerX "><ClearTransactions onDeleteAllClick={onDeleteAllClick} /></div>
          </div> */}
          {listOfTransactions.map((transaction) => (
            <Transaction
              key={transaction.id}
              name={transaction.name}
              amount={transaction.amount}
              onDeleteClick={() => onDeleteClick(transaction)}
            />
          ))}
          {listOfTransactions.length >= 2 && (
            <ClearTransactions onDeleteAllClick={onDeleteAllClick} />
          )}
        </div>
      </div>
    </>
  );
}

export default TransactionList;
