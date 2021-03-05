
// Filters the transactions and returns all but the one the user selected
export const filterListService = (transactions, selectedTransaction) => {
  /**
   * transactions = getAllTransactionsFromDb();
   * transactions.filter(t => !t.id.includes(selectedTransaction.id));
   */

  const newList = transactions.filter(
    (t) => !t.id.includes(selectedTransaction.id)
  );
  return newList;
};

// Pushes a Transaction to the Transactions object
export const addTransactionService = (transactions, transaction) => [...transactions, transaction]

// subtracts from budget
export const subtractFromBudgetService = (budget, amount) => budget - amount;

// adds to budget
export const addBackToBudgetService = (budget, amount) => budget + amount;