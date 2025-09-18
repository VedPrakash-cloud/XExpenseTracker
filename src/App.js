import Expense from "./component/expense";
import AddFunds from "./component/addFunds";
import Bar from "./component/barChart";
import Lists from "./component/List&Pagination";
import Pie from "./component/PieChart";
import EditExpense from "./component/Modal";
import { useState, useEffect } from "react";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import Modal from 'react-modal';



Modal.setAppElement('#root');

function App() {
  const [editingExpense, setEditingExpense] = useState(false);
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

  const handleEditExpense = (updatedExpense) => {
    setExpense((prev) => {
      return prev.map((item) => {
        if (item.id === updatedExpense.id) {
          const oldAmount = item.amount;
          const newAmount = updatedExpense.amount;
          const diffAmount = newAmount - oldAmount;

          if (diffAmount > balance) {
            enqueueSnackbar("Price should be less than the wallet balance", { variant: "error" });
            return item;
          }
          setBalance((prevBal) => prevBal - diffAmount);
          return updatedExpense;
        }
        return item;
      })
    })
  }

  const handleDeleteExpense = (id) => {
    setExpense((prev) => {
      const deleted = prev.find((item) => item.id === id);
      if (deleted) {
        setBalance((prevBal) => prevBal + deleted.amount);
      }
      return prev.filter((item) => item.id !== id);
    })
  }
  // Bar chart start here //

  const categoryTools = expense.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  const BarData = Object.entries(categoryTools).map(([name, value]) => ({
    name, value
  }))




  return (
    <SnackbarProvider autoHideDuration={3000}>
      <div className="bg-zinc-800 min-h-screen text-center md:text-start">
        <header className="p-5 sticky top-0 bg-zinc-900 shadow-md z-10">
          <h1 className="font-bold text-2xl text-white">
            Expense Tracker
          </h1>
        </header>
        <main className="p-5 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AddFunds balance={balance} onAddFunds={handleAddFunds}/>
            <Expense expense={expense} onAddExpense={handleExpense} />
            <Pie expenseList={expense} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <Lists expense={expense} onDeleteExpense={handleDeleteExpense} onEditExpense={setEditingExpense} />
            </div>
            <div className="lg:col-span-2">
              <Bar expenseList={BarData} />
            </div>
          </div>
        </main>
      </div>
      {editingExpense &&
        <EditExpense
          expense={editingExpense}
          onEditExpense={handleEditExpense}
          onClose={() => setEditingExpense(false)}
        />
      }
    </SnackbarProvider >
  );
}

export default App;