import React from "react";
import { Transaction, ClearTransactions } from ".";

function TransactionList({ listOfTransactions, onDeleteClick, onDeleteAllClick }) {
  if (listOfTransactions.length === 0) {
    return null;
  }

  return (
    <>
      <div className="d-flex justify-content-center col-lg-8 mt-4 shadow centerX">
        <div className="col-lg-12">
          {listOfTransactions.map((transaction) => (
            <Transaction
              key={transaction.id}
              name={transaction.name}
              amount={transaction.amount}
              onDeleteClick={() => onDeleteClick(transaction)}
            />
          ))}
          {listOfTransactions.length >= 2 &&( <ClearTransactions onDeleteAllClick={onDeleteAllClick} />)}
        </div>
      </div>
    </>
  );
}

export default TransactionList;
