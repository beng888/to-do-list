import { useEffect, useState } from "react";
import useGlobalContext from "context";

import Todo from "./Todo";

export default function ToDoList() {
  const {
      todos,
      user,
      toggleTodo,
      toDoTask,
      forUpdate,
      filter,
      deleteTodo,
      style,
    } = useGlobalContext(),
    [filterValue] = filter,
    [userValue, setUserValue] = user,
    [styleValue, setStyleValue] = style,
    [toDoTaskValue, setToDoTaskValue] = toDoTask,
    [forUpdateValue, setForUpdateValue] = forUpdate,
    [filteredList, setFilteredList] = useState([]);

  const handleCheck = (id, e) => {
    const checked = e.target.checked;
    checked
      ? setUserValue({ ...userValue, done: [...userValue.done, id] })
      : setUserValue({
          ...userValue,
          done: userValue.done.filter((i) => i !== id),
        });
  };

  const handleUpdate = (task) => {
    setForUpdateValue(true);
    setToDoTaskValue(task);
    setStyleValue({ ...styleValue, showNewTask: true });
  };

  useEffect(() => {
    if (filterValue === "All Lists") {
      setFilteredList(todos.filter((i) => i.status !== "Done"));
    } else if (filterValue !== "Finished") {
      setFilteredList(
        todos
          .filter((i) => i.list === filterValue)
          .filter((i) => i.status !== "Done")
      );
    } else setFilteredList(todos.filter((i) => i.status !== "Ongoing"));
  }, [todos, filterValue]);

  return (
    <div className="flex flex-col w-screen max-w-lg gap-2 p-4 bg-black-500">
      {filteredList.map((task) => {
        let done = userValue.done.includes(task.created_at);

        return (
          <Todo
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
    </div>
  );
}
