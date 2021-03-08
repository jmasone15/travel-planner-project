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
    <>
      {/* transactions */}
      {/* <div className="mb-3 col-lg-8 justify-content-center">
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Expense"
            aria-label="Expense"
            aria-describedby="basic-addon2"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Amount"
            aria-label="Amount"
            aria-describedby="basic-addon2"
            name="amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </div>
        <div className=" mt-2d-flex justify-content-end">
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={onAddTransactionClick}
            disabled={!numeral.validate(amount)}
          >
            add transaction
          </button>
        </div>
      </div> */}
      <div className="d-flex justify-content-center">
        <form className="col-lg-8 shadow p-4">
          <div className="form-group">
            <label className="labelText" for="expenseName">
              What is the name of your expense?
            </label>
            <input
              type="text"
              className="form-control"
              id="expenseName"
              aria-describedby="expenseName"
              placeholder="Enter name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-group mt-4">
            <label className="labelText" for="expenseAmount">
              How much is the expense?
            </label>
            <input
              type="text"
              className="form-control"
              id="expenseAmount"
              placeholder="Enter amount"
              name="amount"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
            <small id="emailHelp" class="form-text text-muted">
              An expense amount is required.
            </small>
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className={
                !numeral.validate(amount)
                  ? "btn btn-outline-secondary mt-2"
                  : "btn btn-outline-danger mt-2"
              }
              onClick={onAddTransactionClick}
              disabled={!numeral.validate(amount)}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddTransaction;
