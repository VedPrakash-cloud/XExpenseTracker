import {useState} from 'react';
import ExpenseCard from './expensecard';


export default function ExpenseTracker({card}) {
    const[balance, setBalance] = useState(5000);
    const [showBalance, setShowBalance] = useState(false);
    const [inputAmount, setInputAmount] = useState(0);

    const handleWalletBalance=()=>{
        setBalance((prev)=>parseFloat((prev+inputAmount).toFixed(2)));
        setShowBalance(false);
    }
    console.log(inputAmount);

    const handleclick =()=>{
      setShowBalance(true);
    }

    const handleCancel = ()=>{
      setShowBalance(false);
    }


  return (
    <div>
      <h1 className="flex text-white text-2xl font-bold">Expense Tracker</h1>
      <div>
        <div className='flex gap-5 mt-10'>
          <div className='w-96 bg-[#9B9B9B] rounded-md flex flex-col place-content-center'>
            <h1 className="text-2xl text-white">Wallet Balance: <span className='text-lime-400 decoration-lime-500 font-bold'> ₹{balance}</span></h1>
            <div>
              <button type='button' onClick={handleclick} className="bg-green-300 rounded-2xl bg-gradient-to-r from-lime-200 via-lime-500 to-green-600 py-[8px] px-5 text-white text-xl mt-[10px]">
                + Add Income
                </button>
            </div>
          </div>
          {showBalance && (
            <div className='flex flex-col gap-5 bg-gray-300 rounded-md p-5 text-start'>
              <h1 className='font-bold text-2xl'>Add Balance</h1>
              <div className='flex gap-2'>
                <input type="number" onChange={(e)=>setInputAmount(Number(e.target.value))} placeholder='Income Amount' className='rounded-2xl shadow-md p-2' />
                <button type='submit' onClick={handleWalletBalance} className='bg-orange-400 shadow-md rounded-2xl text-white py-2 px-5'>Add Balance</button>
                <button className='bg-gray-200 rounded-2xl shadow-md px-5' type='submit' onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          )}
          <ExpenseCard card={card}/>
          {/* <div className="shadow-2xl bg-[#9B9B9B] rounded-md w-96 h-64">                
          </div> */}
        </div>
      </div>
    </div>
  );
}
