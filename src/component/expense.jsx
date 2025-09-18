import {useState} from 'react';
import Modal from 'react-modal';
import { nanoid } from 'nanoid';

export default function ExpenseCard({expense, onAddExpense}){
  const [inputAmount, setInputAmount] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('')
  const [showModal, setShowModal] =useState(null);

  const handleClick = (e)=>{
    e.preventDefault()
    if(!inputAmount || !title || !category || !date) return;

    onAddExpense({
      id:nanoid(),
      title,
      amount: Number(inputAmount),
      category,
      date,
    })
    setTitle('');
    setCategory('');
    setDate('');
    setInputAmount('');
    setShowModal(null);
  }

  const totalExpense = expense.reduce((sum,item)=> sum + item.amount, 0);


  return (
    <div>
      <div className='rounded-2xl h-full bg-zinc-700 p-6 shadow-lg flex flex-col items-center justify-center text-center'>
        <p className='text-white text-lg md:text-xl font-medium'>Expense:{' '}
          <span className='text-red-400 text-2xl md:text-3xl font-bold mt-1'>
            ₹{totalExpense}
          </span>
        </p>
        <button type='button' onClick={()=>setShowModal('expense')}
        className="mt-4 bg-gradient-to-r from-red-400 via-red-500 to-rose-600
        py-2 px-5 rounded-full text-white font-semibold shadow-md"
        >
          + Add Expense
        </button>
      </div>
      <Modal
      isOpen={showModal === 'expense'}
      onRequestClose={()=>setShowModal(null)}
      className="bg-zinc-100 rounded-2xl shadow-xl p-8 w-[90%] max-w-lg mx-auto outline-none"
      overlayClassName="fixed inset-0 bg-white bg-opacity-40 flex justify-center items-center"
      >
        <h1 className="text-gray-700 text-xl font-bold mb-4">Add Expenses</h1>
        <form onSubmit={handleClick} className='space-y-4'>
        <div className="flex flex-col md:flex-row gap-4">
          <input
          type="text"
          placeholder='Title'
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          required
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 outline-none"
          />

          <input
          type="Number" 
          placeholder='Price' 
          value={inputAmount} 
          onChange={(e)=>setInputAmount(e.target.value)} 
          required
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 outline-none"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <select 
          value={category} 
          onChange={(e)=>setCategory(e.target.value)}
          required
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 outline-none">
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Sports</option>
            <option value="arts">Arts</option>
          </select>

          <input 
          type="date" 
          onChange={(e)=>setDate(e.target.value)}
          required 
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 outline-none"/>
        </div>

        <div className="flex gap-3">
          <button 
          type='submit'
          className="flex-1 bg-orange-500 text-white rounded-xl py-2 font-semibold shadow-md"
          >
            Add Expense
          </button>

          <button 
          type='submit' 
          onClick={()=>setShowModal(null)}
          className="flex-1 bg-gray-200 rounded-xl py-2 font-semibold shadow-md"
          >
            Cancel
          </button>
        </div>
        </form>
      </Modal>
    </div>
  )
}