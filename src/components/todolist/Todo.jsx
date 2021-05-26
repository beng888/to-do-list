import { FaTrashAlt } from "react-icons/fa";
import { BiLoader } from "react-icons/bi";
import { MdArchive, MdUnarchive } from "react-icons/md";
import { ImDownload, ImUpload } from "react-icons/im";
import { AiOutlineLoading } from "react-icons/ai";

export default function Todo({
  filterValue,
  task,
  done,
  handleCheck,
  handleUpdate,
  toggleTodo,
  deleteTodo,
}) {
  let date,
    today,
    onGoingToday,
    onGoingNow,
    onGoing,
    diffDays,
    diffTime,
    isToday;

  if (task.date) {
    date = task.date && new Date(task.date.replace(/-/g, "/"));
    today = new Date();
    onGoingToday = date.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);
    isToday = date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0);
    diffTime = Math.abs(date - today);
    diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  if (task.time) {
    const current = new Date();
    onGoingNow = task.time < current.toLocaleTimeString().substr(0, 5);
  }

  if (onGoingNow && onGoingToday) {
    onGoing = "inProgress";
  } else if (onGoingToday) {
    onGoing = "notInProgress";
  }

  return (
    <div className="w-screen py-2 px-3vw sm:w-50vw">
      <div
        className="flex items-center p-2 duration-150 bg-blue-500 rounded-lg bg-opacity-40 filter hover:brightness-150"
        key={task.created_at}
        style={{ minWidth: "50%" }}
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
              className={`relative w-full  mr-2 duration-500 cursor-pointer overflow-x-hidden truncate ${
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
                    <ImUpload className="absolute text-xl text-blue-300 animate-pulse" />
                  ) : (
                    <ImDownload className="absolute text-xl text-blue-300 animate-pulse" />
                  )}
                  <AiOutlineLoading className="text-xl animate-spin" />
                </div>
              ) : !done && filterValue === "Finished" ? (
                <MdUnarchive
                  className="text-xl"
                  onClick={() => toggleTodo(task.created_at, "Ongoing")}
                />
              ) : done ? (
                <div className="duration-300 hover:text-blue-4">
                  {task.status === "Deleting" ? (
                    <BiLoader className="animate-spin" />
                  ) : filterValue === "Finished" ? (
                    <FaTrashAlt onClick={() => deleteTodo(task.created_at)} />
                  ) : (
                    <MdArchive
                      className="text-xl"
                      onClick={() => toggleTodo(task.created_at, "Done")}
                    />
                  )}
                </div>
              ) : (
                <div />
              )}
            </div>
          </div>
          <div
            onClick={() => handleUpdate(task)}
            className="flex justify-between pl-5 text-xs text-blue-300 cursor-pointer"
          >
            <p>
              {task.date ? `${task.date.replace(/-/g, "/")}` : `no date`}
              {task.time && `, ${task.time}`}
            </p>

            {task.date && filterValue === "Finished" ? (
              <p>{done ? "delete" : "recycle"}</p>
            ) : (
              <p className="pointer-events-none">
                {onGoing === "In Progress"
                  ? "Ongoing"
                  : onGoing === "notInProgress"
                  ? `${diffDays} days ago`
                  : isToday
                  ? "Today"
                  : task.date
                  ? "Pending"
                  : ""}
              </p>
            )}
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
