import { RiCloseCircleFill } from "react-icons/ri";
import { FcCalendar, FcAlarmClock } from "react-icons/fc";

export default function Input({ value, type, onChange, remove, children }) {
  const textOrEmail = type === "text" || type === "email";

  return (
    <div className="flex items-center">
      <div
        tabIndex="0"
        className="relative w-full mb-2 font-normal text-gray-300 group"
      >
        <div className="flex items-center">
          <span
            className={`${!value && type !== "text" && "opacity-0"} w-full`}
          >
            <input
              required
              type={type}
              name={type}
              value={value || ""}
              onChange={onChange}
              className="relative z-10 w-full text-white bg-transparent outline-none"
            />
          </span>
          <span
            className={`absolute left-0 w-full ${
              type !== "text" && "pointer-events-none"
            }  ${value && "opacity-0"}`}
          >
            {value ? value : children}
          </span>
          {!textOrEmail && (
            <span className="absolute text-lg text-white duration-300 rounded-full pointer-events-none group-hover:bg-opacity-90 right-1 group-hover:bg-blue-400">
              {type === "date" ? (
                <FcCalendar className="text-4xl button" />
              ) : type === "time" ? (
                <FcAlarmClock className="text-4xl button" />
              ) : (
                <div />
              )}
            </span>
          )}
        </div>
        <div className={`w-full ${!textOrEmail && "pr-11"}`}>
          <div className="relative overflow-hidden">
            <div
              className={`absolute w-0 duration-1000 z-10 h-2px border-blue-300 border-b-2 group-focus:w-full ${
                value && "w-full"
              }`}
            />
            <div
              className={`transform duration-1000 border-b h-2px ${
                value ? "translate-x-full" : "translate-x-0"
              }`}
            />
          </div>
        </div>
      </div>{" "}
      {value && type !== "email" && remove && (
        <RiCloseCircleFill
          onClick={() => remove()}
          className="text-4xl text-white transform -translate-y-1 button"
        />
      )}
    </div>
  );
}
