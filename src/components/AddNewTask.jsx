import React from "react";
import { FaPlus } from "react-icons/fa";

export default function AddNewTask({ addTask, animate }) {
  return (
    <div
      onClick={() => addTask()}
      className={`${
        animate && "animate-beat"
      } fixed p-4 text-2xl text-blue-100 bg-black rounded-full shadow-xl cursor-pointer max-w-max bottom-16  right-8`}
    >
      <FaPlus />
    </div>
  );
}
