import {useState} from 'react';



export default function ExpenseCard(){
    const [expense, setExpense] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState('');
    const [inputAmount, setInputAmount]= useState(0);
    const [category, setCategory] = useState('');

    const handleClick = ()=>{
        setShowForm(true);
    }

    const handleCancel =()=>{
        setShowForm(false);
    }

    const handleSubmit =()=>{
        setExpense((prev)=>parseFloat(prev+inputAmount).toFixed(2))
        setShowForm(false);
        console.log("title:",title, "category:", category, "Expense:", expense);
    }




    return (
        <div>
            <div className="shadow-2xl bg-[#9B9B9B] rounded-md w-96 h-64 flex flex-col place-content-center">
            <h1 className="text-2xl text-white">Expenses: <span className='text-red-500 decoration-red-500 font-bold'>₹{expense}</span></h1>
            <div>
                <button type='button' onClick={handleClick} className="bg-green-300 rounded-2xl bg-gradient-to-r from-red-300 via-red-400 to-rose-600 py-[8px] px-5 text-white text-xl mt-[10px]">+ Add Expense</button>
            </div>
          </div>
          {showForm && (
                <div>
                    <div className='p-5 bg-gray-200 rounded-2xl'>
                        <h1 className='text-start text-2xl font-bold'>Add Expenses</h1>
                        <div className='flex gap-5 py-5'>
                            <input type="text" placeholder='Title' onChange={(e)=>setTitle(e.target.value)} className='rounded-lg outline-none shodow-lg p-2' />
                            <input type="number" placeholder='Price' onChange={(e)=>setInputAmount(Number(e.target.value))} className='rounded-lg outline-none shodow-lg p-2'/>
                        </div>
                        <div className='flex gap-5 py-5'>
                            <select name="Category" onChange={(e)=>setCategory(e.target.value)} className='rounded-lg outline-none shodow-lg p-2 text-gray-400 w-[200px]' >
                                <option value="Select" defaultChecked={true} >Select Category</option>
                                <option value="Food">Food</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Sports">Sports</option>
                                <option value="Arts">Arts</option>
                            </select>
                            <input type="text" placeholder='Date' className='rounded-lg outline-none shodow-lg p-2'/>
                        </div>
                        <div className='flex gap-5'>
                            <button type='submit' onClick={handleSubmit} className='rounded-2xl shadow-lg bg-orange-500 text-white py-2 px-5'>Add Expenses</button>
                            <button type='submit' onClick={handleCancel} className='rounded-2xl shadow-lg bg-gray-500 text-white py-2 px-5'>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}