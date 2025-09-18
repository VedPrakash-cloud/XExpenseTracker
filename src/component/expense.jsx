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
      <div className='rounded-2xl bg-[#8b8b8b] p-20 text-nowrap'>
        <p className='text-white text-2xl'>Expense:{' '} <span className='text-red-500 font-semibold'>₹{totalExpense}</span></p>
        <button type='button' onClick={()=>setShowModal('expense')}
        className="bg-red-300 shadow-md rounded-2xl bg-gradient-to-r from-red-300 via-red-400 to-rose-600 py-[8px] px-5 text-white text-xl mt-[10px]"
        >+ Add Expense</button>
      </div>
      <Modal
      isOpen={showModal === 'expense'}
      onRequestClose={()=>setShowModal(null)}
      className="bg-zinc-100 rounded-2xl shadow-lg p-6 w-max mx-auto mt-64 outline-none"
      overlayClassName="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-start"
      >
        <h1 className="text-start text-2xl font-bold">Add Expenses</h1>
        <div className="flex gap-5 py-5">
          <input type="text" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)}
          className="rounded-xl outline-none border p-2 shadow-md" />
          <input type="Number" placeholder='Price' value={inputAmount} onChange={(e)=>setInputAmount(e.target.value)} 
          className="rounded-xl outline-none border p-2 shadow-md"/>
        </div>
        <div className="flex gap-5 pb-5">
          <select value={category} onChange={(e)=>setCategory(e.target.value)}
            className="rounded-xl shadow-md outline-none border p-2 text-gray-400 w-[200px]">
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Sports</option>
            <option value="arts">Arts</option>
          </select>
          <input type="date" onChange={(e)=>setDate(e.target.value)} 
          className="rounded-xl shadow-md outline-none border p-2 text-gray-400 w-[200px]"/>
        </div>
        <div className="flex gap-5">
          <button type='submit' onClick={handleClick}
          className="rounded-2xl shadow-md bg-orange-500 text-white py-2 px-5 w-[200px]"
          >Add Expense</button>
          <button type='submit' onClick={()=>setShowModal(null)}
          className="rounded-2xl shadow-md bg-stone-200 py-2 px-10"
          >Cancel</button>
        </div>
      </Modal>
    </div>
  )
}