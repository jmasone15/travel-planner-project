import React, { useState } from "react";
import { AddTransaction, TransactionList } from "../Transaction";
import { useHistory } from "react-router-dom";
import {
  ModifyBudget,
  Budget,
  BudgetInput,
  BudgetGraph,
  BudgetOptions,
} from "../Budget";
import {
  filterListService,
  addTransactionService,
  subtractFromBudgetService,
  addBackToBudgetService,
} from "../../utils/budgetTransactions";
import "../../css/budget.css";

function BudgetPage(props) {
  const [budget, setBudget] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [showModify, setShowModify] = useState(false);
  const history = useHistory();

  const handleSaveBtn = (e, value) => {
    e.preventDefault();
    props.setTripBudget(value);
    console.log(value);
    history.push("/donde");
  };

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

  const deleteAllTransactions = () => {
    setTransactions([]);
    setBudget(totalBudget);
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

  const resetBudget = () => {
    setTotalBudget(0);
    setBudget(0);
    setTransactions([]);
  };

  const showModifyClick = () => {
    setShowModify(!showModify);
  };

  return (
    <div className="bgThis">
      {budget === 0 && transactions.length === 0 && (
        <BudgetInput onChange={setBudget} putTotalBudget={setTotalBudget} />
      )}
      {(budget !== 0 || transactions.length > 0) && (
        <>
          <Budget budget={totalBudget} balance={budget} />
          <BudgetOptions reset={resetBudget} showModify={showModifyClick} />
          {showModify && (
            <ModifyBudget
              addToBudgetClick={addBackToBudget}
              subtractFromBudgetClick={subtractFromBudget}
              addToTotalBudgetClick={updateTotalBudgetAdd}
              subtractFromTotalBudgetClick={updateTotalBudgetSubtract}
            />
          )}
        </>
      )}
      {budget !== 0 && (
        <div className="row justify-content-center col-sm-12">
          <div className="col-lg-5 col-md-6">
            <div className="row">
              <AddTransaction addTransactionClick={addTransaction} />
            </div>
            <div className="row">
              <BudgetGraph listOfTransactions={transactions} />
            </div>
          </div>
          {transactions.length > 0 && (
            <div className="col-lg-5 col-md-6 col-sm-12">
              <TransactionList
                listOfTransactions={transactions}
                onDeleteClick={deleteTransaction}
                onDeleteAllClick={deleteAllTransactions}
              />
            </div>
          )}
        </div>
      )}
      <button onClick={(e) => handleSaveBtn(e, totalBudget)}>
        Save Budget to Trip
      </button>
    </div>
  );
}

export default BudgetPage;
