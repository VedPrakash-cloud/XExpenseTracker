import { useState } from "react";
import Modal from "react-modal";

export default function AddFunds({ balance, onAddFunds }) {
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount)) return;

    onAddFunds(Number(amount));
    setAmount("");
    setShowModal(null);
  };
  return (
    <div>
      <div className="rounded-2xl bg-zinc-700 h-full p-6 shadow-lg flex flex-col items-center justify-center text-center">
        <p className="text-white text-lg md:text-xl font-medium">
          Wallet Balance:{" "}
          <span className="text-green-400 text-2xl md:text-3xl font-bold mt-1">
            ₹{balance}
          </span>
        </p>
        <button
          type="submit"
          onClick={() => setShowModal("income")}
          className="mt-4 bg-gradient-to-r from-lime-400 via-lime-500 to-green-600 py-2 px-5 rounded-full text-white font-semibold shadow-md"
        >
          + Add Income
        </button>
      </div>
      <Modal
        isOpen={showModal === "income"}
        onRequestClose={() => setShowModal(null)}
        className="mt-64 bg-zinc-100 rounded-2xl shadow-xl p-8 w-[90%] max-w-md mx-auto outline-none"
        overlayClassName="fixed inset-0 bg-white bg-opacity-40 flex justify-center items-start"
      >
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Add Balance</h1>
        <form onSubmit={handleSubmit} className="flex">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <input
              type="number"
              name="amount"
              placeholder=" Income Amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="flex-1 border border-gray-300 py-3 rounded-xl outline-none
                    shadow-sm"
            />
            <div className="flex flex-col md:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 bg-orange-500 text-white rounded-xl px-5 py-2 font-semibold shodow-md"
              >
                Add Balance
              </button>
              <button
                type="submit"
                onClick={() => setShowModal(null)}
                className="flex-1 bg-gray-200 rounded-xl py-2 px-5 font-semibold shadow-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
