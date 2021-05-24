import React from "react";
import useGlobalContext from "context";

export default function ConfirmationModal() {
  const { style, toDoTask, reset, forUpdate, forDelete, deleteTodo } =
      useGlobalContext(),
    [forDeleteValue] = forDelete,
    [styleValue, setStyleValue] = style,
    [toDoTaskValue, setToDoTaskValue] = toDoTask,
    [forUpdateValue, setForUpdateValue] = forUpdate;

  const handleClick = () => {
    forDeleteValue && deleteTodo(toDoTaskValue.created_at);
    setToDoTaskValue(reset);
    setForUpdateValue(false);
    setStyleValue({
      ...styleValue,
      showNewTask: false,
      confirmationModalOpen: false,
    });
  };

  return (
    <div
      className={`fixed inset-0 z-30 w-full  p-4 bg-opacity-50 duration-300 m-auto text-blue-400 h-full grid content-center bg-black ${
        styleValue.confirmationModalOpen
          ? "opacity-100"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="w-full max-w-md p-4 mx-auto bg-gray-900">
        {styleValue.confirmationModalOpen && <p>OPEN</p>}
        <p>Are you sure?</p>
        <p className="mb-4 text-xs text-white">Quit without saving?</p>
        <div className="flex gap-4 ml-auto w-min">
          <p
            onClick={() =>
              setStyleValue({ ...styleValue, confirmationModalOpen: false })
            }
            className="cursor-pointer"
          >
            CANCEL
          </p>
          <p onClick={() => handleClick()} className="cursor-pointer">
            YES
          </p>
        </div>
      </div>
    </div>
  );
}
