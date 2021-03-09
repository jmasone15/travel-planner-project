import React from "react";
import { Transaction, ClearTransactions } from ".";

function TransactionList({ listOfTransactions, onDeleteClick, onDeleteAllClick }) {
  if (listOfTransactions.length === 0) {
    return null;
  }

  return (
    <>
      <div className="d-flex justify-content-center mt-4 shadow">
        <div className="col-lg-8">
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
