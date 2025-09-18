import {useState} from 'react';
import Modal from 'react-modal'

export default function AddFunds({balance, onAddFunds}){
    const [amount, setAmount] = useState('')
    const [showModal, setShowModal] = useState(null);

    const handleSubmit =(e)=>{
        e.preventDefault();

        if(!amount || isNaN(amount)) return;

        onAddFunds(Number(amount));
        setAmount('');
        setShowModal(null);
    }
    return (
        <div>
            <div className='rounded-2xl bg-[#8b8b8b] p-20 text-nowrap'>
                <p className='text-white text-2xl'>Wallet Balance:{' '}
                    <span className='text-green-500 font-semibold'>₹{balance}</span></p>
                <button type='submit' onClick={()=>setShowModal('income')}
                className="bg-green-300 shadow-md rounded-2xl bg-gradient-to-r from-lime-200 via-lime-500 to-green-600 py-[8px] px-5 text-white text-xl mt-[10px]"
                >+ Add Income</button>
            </div>
            <Modal
            isOpen={showModal==='income'}
            onRequestClose={()=>setShowModal(null)}
            className="bg-zinc-100 rounded-2xl shadow-lg p-10 w-max text-nowrap mx-auto mt-64 outline-none"
            overlayClassName="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-start"
            >
                <h1 className='text-2xl font-bold'>Add Balance</h1>
                <div className='flex gap-2 items-center'>
                    <input type="Number" placeholder='Income Amount' onChange={(e)=>setAmount(Number(e.target.value))} 
                    className='text-gray-400 rounded-2xl outline-none p-3 my-2 shadow-md' />
                    <button type='submit' value={amount} placeholder="Add Funds" onClick={handleSubmit}
                    className='rounded-2xl bg-orange-400 text-white text-lg shadow-md py-2 px-5'>Add Balance</button>
                    <button type='submit' onClick={()=>setShowModal(null)}
                    className='bg-gray-200 shadow-md rounded-2xl py-2 px-5 w-full'>Cancel</button>
                </div>
            </Modal>
        </div>
    )
}