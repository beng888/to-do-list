import { FaTrashAlt, FaRecycle } from "react-icons/fa";
import { BiLoader } from "react-icons/bi";

import {
  AiFillCodeSandboxCircle,
  AiOutlineLoading,
  AiFillDropboxCircle,
} from "react-icons/ai";

export default function Todo({
  filterValue,
  task,
  done,
  handleCheck,
  handleUpdate,
  toggleTodo,
  deleteTodo,
}) {
  return (
    <div
      className="flex items-center w-full gap-2 px-2 py-1 duration-150 rounded-lg filter hover:brightness-150 primary-bg-2"
      key={task.created_at}
    >
      <div className="relative w-full">
        <div className="flex items-center text-white">
          <input
            onChange={(e) => handleCheck(task.created_at, e)}
            type="checkbox"
            checked={done}
            className="mr-2 cursor-pointer"
          />
          <p
            onClick={() => handleUpdate(task)}
            className={`relative w-full mr-2 duration-500 cursor-pointer ${
              done && "text-gray-300"
            }`}
          >
            {task.text}
            <span
              className={`${
                done ? "w-full" : "w-0"
              } absolute inset-x-0 h-2 duration-500 transform translate-y-1 border-b`}
            />
          </p>
          <div className="cursor-pointer">
            {task.status === "Updating" ? (
              <div>
                {filterValue === "Finished" ? (
                  <AiFillDropboxCircle className="absolute text-xl text-blue-300 animate-pulse" />
                ) : (
                  <AiFillCodeSandboxCircle className="absolute text-xl text-blue-300 animate-pulse" />
                )}
                <AiOutlineLoading className="text-xl animate-spin" />
              </div>
            ) : !done && filterValue === "Finished" ? (
              <FaRecycle
                onClick={() => toggleTodo(task.created_at, "Ongoing")}
              />
            ) : done ? (
              <div>
                {task.status === "Deleting" ? (
                  <BiLoader className="animate-spin" />
                ) : (
                  <FaTrashAlt
                    onClick={() =>
                      filterValue === "Finished"
                        ? deleteTodo(task.created_at)
                        : toggleTodo(task.created_at, "Done")
                    }
                  />
                )}
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
        <p
          onClick={() => handleUpdate(task)}
          className="pl-5 text-xs text-blue-300 cursor-pointer"
        >
          {task.date} {task.time && `, ${task.time}`}
        </p>
      </div>
    </div>
  );
}
