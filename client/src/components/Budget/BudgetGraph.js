import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { randomColor } from "../../utils/randomColorGen";

function BudgetGraph({ listOfTransactions }) {
  const [labels, setLabels] = useState([]);
  const [amounts, setAmounts] = useState([]);

  useEffect(() => {
    updateDataVariables();
  }, [listOfTransactions.length]);

  const updateDataVariables = () => {
    if (listOfTransactions.length > 0) {
      const l = listOfTransactions.map((t) => t.name);
      const amts = listOfTransactions.map((a) => a.amount);
      setAmounts(amts);
      setLabels(l);
    }
  };

  if (listOfTransactions.length === 0) {
    return null;
  }

  const data = {
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: labels,
    datasets: [
      {
        data: amounts,
        backgroundColor: listOfTransactions.map(() => randomColor()),
      },
    ],
  };

  return (
    <div style={{ height: "250px", width: "250px" }}>
      <Pie data={data} height={20} width={20} />
    </div>
  );
}

export default BudgetGraph;
// var myPieChart = new Chart(ctx, {
//   type: 'pie',
//   data: data,
//   options: options
// });
