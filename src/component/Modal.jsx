import { useState, useEffect } from "react";
import Modal from "react-modal";

export default function EditExpense({expenses, onEditExpense, onClose}) {

  const [inputAmount, setInputAmount] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  useEffect(()=>{
    if(expenses){
      setTitle(expenses.title ||'');
      setInputAmount(expenses.amount || '');
      setCategory(expenses.category || '');
      setDate(expenses.date || '');
    }
  },[expenses]);
  
  const handleClick = (e)=>{
    e.preventDefault()
    if(!inputAmount || !title || !category || !date) return;

    onEditExpense({
      ...expenses,
      title,
      amount: Number(inputAmount),
      category,
      date,
    })
    onClose();
  }

  return (
    <div>
      <Modal
        isOpen={!!expenses}
        onRequestClose={onClose}
        ariaHideApp={false}
        className="bg-zinc-100 rounded-2xl shadow-lg p-6 w-max mx-auto mt-64 outline-none"
        overlayClassName="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-start"
      >
        <h1 className="text-start text-2xl font-bold">Edit Expenses</h1>
        <div className="flex gap-5 py-5">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl outline-none border p-2 shadow-md"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            className="rounded-xl outline-none border p-2 shadow-md"
          />
        </div>
        <div className="flex gap-5 pb-5">
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl shadow-md outline-none border p-2 text-gray-400 w-[200px]"
          >
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="entertainment">Entertainment</option>
            <option value="travel">Travel</option>
            <option value="sport">Sport</option>
            <option value="arts">Art</option>
          </select>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-xl shadow-md outline-none border p-2 text-gray-400 w-[200px]"
          />
        </div>
        <div className="flex gap-5">
          <button
            type="submit"
            onClick={handleClick}
            className="rounded-2xl shadow-md bg-orange-500 text-white py-2 px-5 w-[200px]"
          >
            Edit Expense
          </button>
          <button
            type="submit"
            onClick={onClose}
            className="rounded-2xl shadow-md bg-stone-200 py-2 px-10"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
