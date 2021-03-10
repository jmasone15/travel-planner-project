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

  const handleSaveBtn = (e) => {
    e.preventDefault();
    props.setTripBudget(totalBudget);
    props.setTripExpenses(JSON.stringify(transactions));
    props.setTripName("");
    props.setTripStartLocation("");
    props.setTripDestination("");
    props.setTripDates([]);
    // console.log(totalBudget);
    // console.log(JSON.stringify(transactions))
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
    setShowModify(false);
  };

  const showModifyClick = () => {
    setShowModify(!showModify);
  };

  return (
    <div className="bgThis p-5">
      {budget === 0 && transactions.length === 0 && (
        <BudgetInput
          onChange={setBudget}
          putTotalBudget={setTotalBudget}
          save={handleSaveBtn}
        />
      )}
      {budget !== 0 && (
        <div className="container shadow bg-light p-5 mt-3 col-lg-10">
          <>
            <Budget budget={totalBudget} balance={budget} />
            <BudgetOptions
              reset={resetBudget}
              showModify={showModifyClick}
              save={handleSaveBtn}
            />
            {showModify && (
              <ModifyBudget
                addToBudgetClick={addBackToBudget}
                subtractFromBudgetClick={subtractFromBudget}
                addToTotalBudgetClick={updateTotalBudgetAdd}
                subtractFromTotalBudgetClick={updateTotalBudgetSubtract}
                clearModify={showModifyClick}
              />
            )}
          </>
          {budget !== 0 && (
            <div className="row justify-content-center">
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
        </div>
      )}
      {/* <button onClick={(e) => handleSaveBtn(e, totalBudget)}>
        Save Budget to Trip
      </button> */}
    </div>
  );
}

export default BudgetPage;
