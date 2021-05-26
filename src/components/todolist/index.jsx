import useGlobalContext from "context";
import { useEffect, useState } from "react";
import { BiLoaderAlt, BiArrowToTop } from "react-icons/bi";
import Todo from "./Todo";

export default function ToDoList() {
  const {
      user,
      toggleTodo,
      toDoTask,
      forUpdate,
      filter,
      deleteTodo,
      style,
      filteredList,
    } = useGlobalContext(),
    [filterValue] = filter,
    [userValue, setUserValue] = user,
    [filteredListValue] = filteredList,
    [styleValue, setStyleValue] = style,
    [toDoTaskValue, setToDoTaskValue] = toDoTask,
    [forUpdateValue, setForUpdateValue] = forUpdate;

  const handleCheck = (id, e) => {
    const checked = e.target.checked;
    checked
      ? setUserValue({ ...userValue, done: [...userValue.done, id] })
      : setUserValue({
          ...userValue,
          done: userValue.done.filter((i) => i !== id),
        });
    localStorage.setItem("userValue", JSON.stringify(userValue));
  };

  const handleUpdate = (task) => {
    setForUpdateValue(true);
    setToDoTaskValue(task);
    setStyleValue({ ...styleValue, showNewTask: true });
  };

  const tasksPerPage =
    filteredListValue.length > 20 ? 20 : filteredListValue.length;

  const [limit, setLimit] = useState(tasksPerPage);
  const [loading, setLoading] = useState(false);

  function handleScroll(e) {
    if (window.innerWidth > 640) return;
    if (limit >= filteredListValue.length) return;

    const target = e.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      setLoading(true);
      setTimeout(() => {
        if (limit < filteredListValue.length) {
          setLimit(limit + tasksPerPage);
        } else setLimit(filteredListValue.length);
        setLoading(false);
      }, 1000);
    }
  }

  function scrollTop() {
    document.getElementById("todos").scrollTo(0, 0);
  }

  return (
    <div
      id="todos"
      onScroll={(e) => handleScroll(e)}
      className="grid w-screen max-h-screen pt-24 overflow-x-hidden overflow-y-auto duration-700 transform sm:overflow-visible sm:grid-flow-col sm:grid-rows-5 bg-black-500"
      style={{
        transform: `translateX(${
          window.innerWidth <= 640
            ? "0"
            : `-${styleValue.currentSlide * 100 - 100}%`
        })`,
      }}
    >
      {filteredListValue
        .slice(0, window.innerWidth <= 640 ? limit : filteredListValue.length)
        .map((task) => {
          let done = userValue.done.includes(task.created_at);

          return (
            <Todo
              key={task.created_at}
              task={task}
              done={done}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
              filterValue={filterValue}
              handleUpdate={handleUpdate}
              handleCheck={handleCheck}
            />
          );
        })}
      <div className="z-20 flex justify-center w-screen pt-4 text-3xl text-white h-28 sm:hidden">
        {loading && <BiLoaderAlt className="animate-spin" />}
        {limit >= filteredListValue.length && (
          <BiArrowToTop
            className="cursor-pointer animate-pulse"
            onClick={() => scrollTop()}
          />
        )}
      </div>
    </div>
  );
}
