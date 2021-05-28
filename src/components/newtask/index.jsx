import { FaArrowLeft, FaTrashAlt } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";

import useGlobalContext from "context";
import Form from "./Form";
import { RiLoader5Line } from "react-icons/ri";

export default function NewTask({ open }) {
  const {
      toDoTask,
      style,
      addTodo,
      forUpdate,
      updateTodo,
      listOptions,
      forDelete,
      notification,
      loading,
    } = useGlobalContext(),
    [forUpdateValue] = forUpdate,
    [styleValue, setstyleValue] = style,
    [toDoTaskValue, setToDoTaskValue] = toDoTask,
    [forDeleteValue, setForDeleteValue] = forDelete,
    [notificationValue, setNotificationValue] = notification;

  const handleSubmit = async () => {
    if (toDoTaskValue.text) {
      try {
        forUpdateValue ? updateTodo(toDoTaskValue.created_at) : addTodo();
      } catch (err) {
        console.log(err);
      }
    } else {
      setNotificationValue({ active: true, text: "Enter a task first" });
    }
  };

  const goBackToList = () => {
    if (toDoTaskValue.text || toDoTaskValue.date) {
      setstyleValue({ ...styleValue, confirmationModalOpen: true });
    } else {
      setstyleValue({
        ...styleValue,
        showNewTask: false,
        confirmationModalOpen: false,
      });
    }
  };

  return (
    <div
      className={`fixed w-full sm:max-w-xl  mx-auto  inset-0 transform duration-500 pt-16 z-20 overflow-y-auto primary-bg font-bold text-blue-300 ${
        open
          ? "translate-x-0 sm:scale-1"
          : "translate-x-full sm:scale-x-0 sm:scale-y-50 sm:translate-x-0"
      }`}
    >
      <div className="fixed top-0 left-0 flex items-center justify-between w-full px-4 py-3 text-xl text-white shadow-lg primary-bg-2">
        <div className="flex items-center gap-6">
          <FaArrowLeft
            onClick={() => goBackToList()}
            className="cursor-pointer"
          />
          <p>New Task</p>
        </div>
        {forUpdateValue && (
          <FaTrashAlt
            onClick={() => {
              setstyleValue({ ...styleValue, confirmationModalOpen: true });
              setForDeleteValue(true);
            }}
            className="cursor-pointer"
          />
        )}
      </div>
      <Form
        toDo={toDoTaskValue}
        setToDo={setToDoTaskValue}
        options={listOptions}
      />
      <div className="w-full mt-12 mb-4 overflow-hidden px-9vw sm:px-8 h-14">
        <div className="relative ml-auto w-max">
          <AiFillCheckCircle
            onClick={handleSubmit}
            className="text-5xl text-black bg-blue-300 rounded-full cursor-pointer"
          />
          {loading && (
            <RiLoader5Line className="absolute top-0 text-5xl text-blue-300 rounded-full animate-spin" />
          )}
        </div>
      </div>
    </div>
  );
}
