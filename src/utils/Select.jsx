import { FaCaretDown } from "react-icons/fa";

export default function Select({ selected, children, arrowClass }) {
  return (
    <div
      className="relative flex items-center text-white cursor-pointer h-fit min-w-max group focus:cursor-default"
      tabIndex="0"
    >
      <div className="relative w-full min-w-200px">
        <p className="p-2 ">{selected}</p>
        <li className="absolute top-0 z-10 grid w-2/3 overflow-hidden list-none duration-300 bg-gray-900 cursor-pointer max-h-0 group-focus:w-full group-focus:max-h-screen">
          {children}
        </li>
      </div>
      <FaCaretDown
        tabIndex="0"
        className={`${arrowClass} ml-auto text-3xl text-black transform pointer-events-none h-fit button group-focus:rotate-180 group-focus:pointer-events-auto group-hover:bg-blue-300 group-focus:bg-transparent`}
      />
    </div>
  );
}
