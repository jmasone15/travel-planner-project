import React, { useState } from "react";
import { AddTransaction, TransactionList } from "../components/Transaction";
import { ModifyBudget, Budget, BudgetInput } from "../components/Budget";
import {
  filterListService,
  addTransactionService,
  subtractFromBudgetService,
  addBackToBudgetService,
} from "../util/budgetTransactions";
import BudgetGraph from "../components/BudgetGraph/BudgetGraph";

function BudgetPage() {
  const [budget, setBudget] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    const newTransactionList = addTransactionService(transactions, transaction);
    setTransactions(newTransactionList);
    subtractFromBudget(transaction.amount);
  };

  const deleteTransaction = (transaction) => {
    const newTransactionList = filterListService(transactions, transaction);
    addBackToBudget(transaction.amount);
    setTransactions(newTransactionList);
  };

  const subtractFromBudget = (amount) => {
    const newBudgetTotal = subtractFromBudgetService(budget, amount);
    setBudget(newBudgetTotal);
  };

  const addBackToBudget = (amount) => {
    const newBudgetTotal = addBackToBudgetService(budget, amount);
    setBudget(newBudgetTotal);
  };

  const updateTotalBudgetAdd = (amount) => {
    const newTotalBudget = addBackToBudgetService(totalBudget, amount);
    setTotalBudget(newTotalBudget);
  };

  const updateTotalBudgetSubtract = (amount) => {
    const newTotalBudget = subtractFromBudgetService(totalBudget, amount);
    setTotalBudget(newTotalBudget);
  };

  return (
    <div>
      {budget === 0 && transactions.length === 0 && (
        <BudgetInput onChange={setBudget} putTotalBudget={setTotalBudget}/>
      )}
      {(budget !== 0 || transactions.length > 0) && (
        <>
          <Budget budget={totalBudget} balance={budget} /> 
          <AddTransaction addTransactionClick={addTransaction} />
        </>
      )}
      <TransactionList
        listOfTransactions={transactions}
        onDeleteClick={deleteTransaction}
      />
      {(budget !== 0 || transactions.length > 0) && (
        <ModifyBudget
          addToBudgetClick={addBackToBudget}
          subtractFromBudgetClick={subtractFromBudget}
          addToTotalBudgetClick={updateTotalBudgetAdd}
          subtractFromTotalBudgetClick={updateTotalBudgetSubtract}
        />
      )}
      <BudgetGraph listOfTransactions={transactions} />
    </div>
  );
}

export default BudgetPage;