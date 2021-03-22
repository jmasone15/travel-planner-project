import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { randomColor } from "../../utils/randomColorGen";
import numeral from "numeral";

function AddTransaction({ addTransactionClick }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const onAddTransactionClick = () => {
    const id = uuidv4();

    const transaction = {
      id: id,
      name: name,
      amount: numeral(amount).value(),
      color: randomColor(),
    };

    addTransactionClick(transaction);
    setName("");
    setAmount("");
  };

  return (
      <div className="shadow p-4 addExpense">
        <form className="col-lg-12">
          <div className="form-group">
            <label className="labelText" for="expenseName">
              What is the name of your expense?
            </label>
            <input
              type="text"
              className="form-control"
              id="expenseName"
              aria-describedby="expenseName"
              placeholder="$0.00"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <small id="nameRequired" className={!name ? "form-text text-danger" : "form-text text-muted"}>
              An expense name is required.
            </small>
          </div>
          <div className="form-group mt-4">
            <label className="labelText" for="expenseAmount">
              How much is the expense?
            </label>
            <input
              type="text"
              className="form-control"
              id="expenseAmount"
              placeholder="$0.00"
              name="amount"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
            <small id="amountRequired" className= {!numeral.validate(amount) ? "form-text text-danger" : "form-text text-muted"} >
              A valid expense amount is required.
            </small>
          </div>
          <div className="col-8 centerX">
            <button
              // type="button"
              className={
                !numeral.validate(amount) || !name
                  ? "btn btn-block btn-outline-secondary mt-2"
                  : "btn btn-block btn-primary mt-2"
              }
              onClick={onAddTransactionClick}
              disabled={!numeral.validate(amount) || !name}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
  );
}

export default AddTransaction;
