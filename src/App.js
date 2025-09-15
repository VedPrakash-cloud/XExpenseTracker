import Expense from "./component/expense";
import AddFunds from "./component/addFunds";
import Bar from "./component/barChart";
import Lists from "./component/List&Pagination";
import Pie from "./component/PieChart";
import { useState, useEffect } from "react";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import "./App.css";

function App() {
  const [balance, setBalance] = useState(() => {
    const savedBalance = localStorage.getItem("balance");
    return savedBalance ? Number(savedBalance) : 5000;
  });
  const [expense, setExpense] = useState(() => {
    const savedExpense = localStorage.getItem("expense");
    return savedExpense ? JSON.parse(savedExpense) : [];
  });

  useEffect(() => {
    localStorage.setItem("balance", balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("expense", JSON.stringify(expense));
  }, [expense]);

  const handleAddFunds = (amount) => {
    setBalance((prev) => prev + amount);
  };

  const handleExpense = (expense) => {
    if (expense.amount > balance) {
      enqueueSnackbar("Please add more funds", { variant: "error" });
      return;
    }

    setExpense((prev) => [...prev, { ...expense, id: Date.now() }]);
    setBalance((prev) => prev - expense.amount);
  };

  return (
    <SnackbarProvider autoHideDuration={3000}>
      <div className="App bg-zinc-700 h-full p-5 flex flex-col">
        <h1 className="font-bold text-2xl text-white text-start pb-5">
          Expense Tracker
        </h1>
        <div className="flex gap-5 p-10 bg-[#6B6B6B] rounded-2xl mb-10">
          <AddFunds balance={balance} onAddFunds={handleAddFunds} />
          <Expense expense={expense} onAddExpense={handleExpense} />
          <Pie />
        </div>
        <div className="flex gap-5">
          <div className="w-3/4">
            <Lists expense={expense} onAddExpense={handleExpense}/>
          </div>
          <div className="1/4">
            <Bar />
          </div>
        </div>
      </div>
    </SnackbarProvider>
  );
}

export default App;
