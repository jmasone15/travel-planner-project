import React, { useState } from "react";
import { AddTransaction, TransactionList } from "../Transaction";
import { useHistory } from "react-router-dom";
import { ModifyBudget, Budget, BudgetInput, BudgetGraph } from "../Budget";
import {
  filterListService,
  addTransactionService,
  subtractFromBudgetService,
  addBackToBudgetService,
} from "../../utils/budgetTransactions";
import "../../css/budget.css"


function BudgetPage(props) {
  const [budget, setBudget] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const history = useHistory();

  const handleSaveBtn = (e, value) => {
    e.preventDefault();
    props.setTripBudget(value);
    console.log(value);
    history.push("/recommend");
  }

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
    <div className="">
      {budget === 0 && transactions.length === 0 && (
        <BudgetInput onChange={setBudget} putTotalBudget={setTotalBudget} />
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
      <button onClick={(e) => handleSaveBtn(e, totalBudget)}>Save Budget to Trip</button>
    </div>
  );
}

export default BudgetPage;
