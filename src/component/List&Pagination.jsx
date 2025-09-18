import { PiPizza } from "react-icons/pi";
import { SiAmazongames } from "react-icons/si";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaMasksTheater } from "react-icons/fa6";
import { DiAppstore } from "react-icons/di";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import {useState} from 'react';

export default function ListPagination({ expense, onDeleteExpense, onEditExpense }) {

  const [currentPage, setCurretPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const totalPages = Math.ceil(expense.length/itemsPerPage);
  const startIndex = (currentPage-1) *itemsPerPage;
  const currentItems = expense.slice(startIndex, startIndex+itemsPerPage)

  const CategoryIcons = {
    Food: <PiPizza size={20} />,
    entertainment: <FaMasksTheater size={20} />,
    arts: <DiAppstore size={20} />,
    sports: <SiAmazongames size={20} />,
  };



  return (
    <div className="mb-5">
      <h1 className="text-white font-bold text-2xl mb-5">
        Recent Transactions
      </h1>
      <div className="bg-white rounded-xl p-5">
        {expense.length === 0 ? (
          <p className="text-start">No transactions!</p>
        ) : (
          <div className="bg-white rounded-xl m-2">
            {currentItems.map((data) => (
              <div
                key={data.id}
                className="border-b-2 flex justify-between items-center py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center bg-gray-300 text-gray-700 rounded-3xl p-2.5 ">
                    {CategoryIcons[data.category]}
                  </div>
                  <div>
                    <p className="flex text-start font-medium">{data.title}</p>
                    <p className="flex text-start text-gray-500 text-xs">
                      {data.date}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center gap-3 items-center">
                  <span className="font-bold text-xl text-yellow-500">
                    ₹{data.amount}
                  </span>
                  <button className="bg-red-500 p-2 rounded-xl shadow-md"
                  onClick={()=>onDeleteExpense(data.id)}>
                    <IoMdCloseCircleOutline size={30} className="text-white"/>
                  </button>
                  <button className="bg-yellow-400 p-2 rounded-xl shadow-md"
                  onClick={()=>onEditExpense(data)}>
                    <MdOutlineModeEdit size={30} className="text-white"/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {expense.length > itemsPerPage && 
      <div className="flex items-center justify-center mt-4">
          <button
          onClick={()=>setCurretPage(currentPage-1)}
          disabled={currentPage === 1}
          className="bg-[#F1F1F1] rounded-2xl p-3 shadow-md shadow-gray-400 mr-2 cursor-pointer disabled:opacity-50">
            <IoIosArrowRoundBack size={28}/>
          </button>
          <span className="bg-[#43967B] text-white px-5 py-2 rounded-md text-3xl shadow-md shadow-gray-400">{currentPage}</span>
          <button
          onClick={()=>setCurretPage(currentPage+1)}
          disabled={currentPage === totalPages}
          className="bg-[#F1F1F1] rounded-2xl p-3 shadow-md shadow-gray-400 ml-2 cursor-pointer disabled:opacity-50">
            <IoIosArrowRoundForward size={28} />
          </button>
      </div>
      }
      </div>
    </div>
  );
}
