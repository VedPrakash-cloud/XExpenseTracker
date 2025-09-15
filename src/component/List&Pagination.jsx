import { nanoid } from "nanoid";
import { PiPizza } from "react-icons/pi";
import { SiAmazongames } from "react-icons/si";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaMasksTheater } from "react-icons/fa6";
import { DiAppstore } from "react-icons/di";

export default function ListPagination({ expense }) {
  const CategoryIcons = {
    Food: <PiPizza size={20} />,
    entertainment: <FaMasksTheater size={20} />,
    arts: <DiAppstore size={20} />,
    sports: <SiAmazongames size={20} />,
  };

  return (
    <div>
      <h1 className="text-white font-bold text-2xl mb-5 text-start">
        Recent Transactions
      </h1>
      <div className="bg-white rounded-xl p-5">
        {expense.length === 0 ? (
          <p className="text-start">No transactions!</p>
        ) : (
          <div className="bg-white rounded-xl m-2">
            {expense.map((data) => (
              <div
                key={nanoid()}
                className="border-b-2 flex justify-between items-center py-2"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center bg-gray-400 rounded-3xl p-2 ">
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
                  <button className="bg-red-500 p-2 rounded-xl shadow-md">
                    <IoMdCloseCircleOutline size={30} className="text-white" />
                  </button>
                  <button className="bg-yellow-400 p-2 rounded-xl shadow-md">
                    <MdOutlineModeEdit size={30} className="text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
