import React from "react";
import { Transaction } from ".";

function TransactionList({ listOfTransactions, onDeleteClick }) {
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
        </div>
      </div>
    </>
  );
}

export default TransactionList;
