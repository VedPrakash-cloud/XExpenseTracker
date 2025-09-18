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
  const [expenses, setExpenses] = useState(() => {
    const savedExpense = localStorage.getItem("expenses");
    return savedExpense ? JSON.parse(savedExpense) : [];
  });

  useEffect(() => {
    localStorage.setItem("balance", balance);
  }, [balance]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddFunds = (amount) => {
    setBalance((prev) => prev + amount);
  };

  const handleExpense = (expenses) => {
    if (expenses.amount > balance) {
      enqueueSnackbar("Please add more funds", { variant: "error" });
      return;
    }

    setExpenses((prev) => [...prev, { ...expenses, id: Date.now() }]);
    setBalance((prev) => prev - expenses.amount);
  };

  const handleEditExpense = (updatedExpense) => {
    setExpenses((prev) => {
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
    setExpenses((prev) => {
      const deleted = prev.find((item) => item.id === id);
      if (deleted) {
        setBalance((prevBal) => prevBal + deleted.amount);
      }
      return prev.filter((item) => item.id !== id);
    })
  }
  // Bar chart start here //

  const categoryTools = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  const BarData = Object.entries(categoryTools).map(([name, value]) => ({
    name, value
  }))




  return (
    <SnackbarProvider autoHideDuration={3000}>
      <div className="bg-[#3B3B3B] min-h-screen text-center md:text-start">
          <h1 className="font-bold text-2xl text-white pl-5">
            Expense Tracker
          </h1>
        <main className="p-5 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#777777] p-5 rounded-xl">
            <AddFunds balance={balance} onAddFunds={handleAddFunds}/>
            <Expense expenses={expenses} onAddExpense={handleExpense} />
            <Pie expenseList={expenses} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <Lists expenses={expenses} onDeleteExpense={handleDeleteExpense} onEditExpense={setEditingExpense} />
            </div>
            <div className="lg:col-span-2">
              <Bar expenseList={BarData} />
            </div>
          </div>
        </main>
      </div>
      {editingExpense &&
        <EditExpense
          expenses={editingExpense}
          onEditExpense={handleEditExpense}
          onClose={() => setEditingExpense(false)}
        />
      }
    </SnackbarProvider >
  );
}

export default App;