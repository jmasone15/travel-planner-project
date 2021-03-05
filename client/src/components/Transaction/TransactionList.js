import React from "react";
import { Transaction } from ".";

function TransactionList({ listOfTransactions, onDeleteClick }) {
  if (listOfTransactions.length === 0) {
    return null;
  }

  return (
    <>
      {listOfTransactions.map((transaction) => (
        <Transaction
          key={transaction.id}
          name={transaction.name}
          amount={transaction.amount}
          onDeleteClick={() => onDeleteClick(transaction)}
        />
      ))}
    </>
  );
}

export default TransactionList;
