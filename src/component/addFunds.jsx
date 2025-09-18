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
      <div className="rounded-2xl bg-[#3B3B3B] h-full p-6 shadow-lg flex flex-col items-center justify-center text-center">
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
        className="mt-64 bg-zinc-100 rounded-2xl shadow-xl px-6 py-8 w-[90%] max-w-md mx-auto outline-none"
        overlayClassName="fixed inset-0 bg-white bg-opacity-40 flex justify-center items-start"
      >
        <h1 className="text-2xl font-bold mb-2">Add Balance</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-2 text-nowrap w-full">
            <input
              type="number"
              name="price"
              placeholder="Income Amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="flex-1 border border-gray-300 py-3 px-2 rounded-xl outline-none
                    shadow-md"
            />
            <div className="flex flex-col md:flex-row gap-2">
              <button
                type="submit"
                className="flex-1 bg-yellow-500 text-white rounded-xl px-3 py-2 font-semibold shadow-md shadow-gray-300"
              >
                Add Balance
              </button>
              <button
                type="submit"
                onClick={() => setShowModal(null)}
                className="flex-1 bg-gray-300 rounded-xl py-2 px-3 font-semibold shadow-md"
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
