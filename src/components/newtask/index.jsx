import { useEffect, useState } from "react";
import { FaArrowLeft, FaTrashAlt } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";

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
      loading,
    } = useGlobalContext(),
    [forUpdateValue] = forUpdate,
    [styleValue, setstyleValue] = style,
    [forDeleteValue, setForDeleteValue] = forDelete,
    [toDoTaskValue, setToDoTaskValue] = toDoTask,
    [invalid, setInvalid] = useState(false);

  const handleSubmit = async () => {
    if (toDoTaskValue.text) {
      try {
        forUpdateValue ? updateTodo(toDoTaskValue.created_at) : addTodo();
      } catch (err) {
        console.log(err);
      }
    } else {
      setInvalid(true);
    }
  };

  const goBackToList = () => {
    if (toDoTaskValue.text || toDoTaskValue.date) {
      setstyleValue({ ...styleValue, confirmationModalOpen: true });
      // window.alert(styleValue.confirmationModalOpen);
    } else {
      setstyleValue({
        ...styleValue,
        showNewTask: false,
        confirmationModalOpen: false,
      });
    }
  };

  useEffect(() => {
    invalid &&
      setTimeout(() => {
        setInvalid(false);
      }, 4000);
  }, [invalid]);

  return (
    <div
      className={`fixed w-full inset-0 transform duration-500 pt-5vw overflow-y-auto primary-bg font-bold text-blue-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="fixed top-0 left-0 flex items-center justify-between w-full px-4 py-3 text-xl text-white bg-blue-500">
        <div className="flex items-center gap-6">
          <FaArrowLeft
            onClick={() => goBackToList()}
            className="cursor-pointer"
          />
          <p>New Task</p>
        </div>
        <FaTrashAlt
          onClick={() => {
            setstyleValue({ ...styleValue, confirmationModalOpen: true });
            setForDeleteValue(true);
          }}
          className="cursor-pointer"
        />
      </div>
      <Form
        toDo={toDoTaskValue}
        setToDo={setToDoTaskValue}
        options={listOptions}
      />

      <div className="relative mt-24 mb-4 ml-auto w-28 ">
        <AiFillCheckCircle
          onClick={handleSubmit}
          className="absolute text-5xl text-black bg-blue-300 rounded-full cursor-pointer "
        />
        {loading && (
          <RiLoader5Line className="absolute text-5xl text-blue-300 rounded-full animate-spin " />
        )}
      </div>
      <div className="absolute bottom-0 w-full overflow-hidden pointer-events-none">
        <div
          className={`${
            invalid ? "translate-y-0" : "translate-y-full"
          } transform duration-500 font-normal leading-loose tracking-wide text-center text-white bg-gray-800`}
        >
          Enter a task first
        </div>
      </div>
    </div>
  );
}
