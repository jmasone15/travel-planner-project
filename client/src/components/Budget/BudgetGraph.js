import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import numeral from "numeral";

function BudgetGraph({ listOfTransactions }) {
  const [labels, setLabels] = useState([]);
  const [amounts, setAmounts] = useState([]);
  const [colors, setColors] = useState([]);

  const transactionsLength = listOfTransactions.length;

  useEffect(() => {
    updateDataVariables();
  }, [transactionsLength]);

  const updateDataVariables = () => {
    if (transactionsLength > 0) {
      const l = listOfTransactions.map((t) => t.name);
      const amts = listOfTransactions.map((a) => a.amount);
      const itemColors = listOfTransactions.map((a) => a.color);
      setAmounts(amts);
      setLabels(l);
      setColors(itemColors);
    }
  };

  if (transactionsLength === 0) {
    return null;
  }

  const tooltipOptions = {
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          console.log(tooltipItem);
          const transactionTotal = amounts.reduce(
            (prev, current) => prev + current,
            0
          );
          const amount = data["datasets"][0]["data"][tooltipItem["index"]];
          const percentage = amount / transactionTotal;
          return `${data["labels"][tooltipItem["index"]]}: [${numeral(
            amount
          ).format("$0,0.00")}, ${numeral(percentage).format("0%")}]`;
        },
      },
    },
  };

  const data = {
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: labels,
    datasets: [
      {
        data: amounts,
        backgroundColor: colors,
      },
    ],
  };

  return (
    <div className="shadow graphStyle mt-3">
      {/* <div className="" style={{ height: "400px", width: "400px" }}> */}
        <Pie options={tooltipOptions} data={data} height={20} width={20} />
      </div>
    // </div>
  );
}

export default BudgetGraph;
