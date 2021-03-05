import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function AddTransaction({ addTransactionClick }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const onAddTransactionClick = () => {
    const id = uuidv4();

    const transaction = {
      id: id,
      name: name,
      amount: parseInt(amount),
    };

    addTransactionClick(transaction);
    setName("");
    setAmount("");
  };

  return (
    <>
      {/* transactions */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Transaction"
          aria-label="Transaction"
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
        <div className="input-group-append">
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={onAddTransactionClick}
            disabled={!amount || isNaN(amount)}
          >
            add transaction
          </button>
        </div>
      </div>
    </>
  );
}

export default AddTransaction;
