import {
  FaCheckCircle,
  FaSearch,
  FaEllipsisV,
  FaListUl,
  FaCheckSquare,
} from "react-icons/fa";
import { GiHouse } from "react-icons/gi";
import { useEffect, useState } from "react";

import { groupBy } from "helpers";
import Select from "utils/Select";
import useGlobalContext from "context";

export default function ToolBar() {
  const { listOptions, filter, todos } = useGlobalContext(),
    [groupedStatus, setGroupedStatus] = useState(null),
    [groupedList, setGroupedList] = useState(null),
    [filterValue, setFilterValue] = filter;

  useEffect(() => {
    setGroupedStatus({
      Done: todos.filter((i) => i.status === "Done"),
      Ongoing: todos.filter((i) => i.status === "Ongoing"),
    });
  }, [todos]);

  useEffect(() => {
    groupedStatus && setGroupedList(groupBy(groupedStatus.Ongoing, "list"));
  }, [groupedStatus]);

  return (
    <div className="fixed top-0 flex justify-between w-full px-4 py-3 text-lg text-white bg-indigo-500 shadow-lg">
      <div className="z-50 flex items-center w-full">
        <p className="text-3xl">
          <FaCheckCircle />
        </p>

        <Select selected={filterValue} arrowClass="-translate-x-14">
          <ul
            tabIndex="0"
            onClick={() => setFilterValue("All Lists")}
            className={`${
              filterValue === "All Lists"
                ? "bg-opacity-100"
                : "hover:bg-opacity-30"
            } bg-blue-400 bg-opacity-0 px-2 pl-2 pr-5 duration-200 flex items-center gap-2`}
          >
            <GiHouse />{" "}
            <p className="flex justify-between w-full">
              <span> All Lists</span>
              <span>{groupedStatus?.Ongoing.length}</span>
            </p>
          </ul>
          {listOptions.map((o) => {
            const getValue = () => {
              if (groupedList)
                for (let [key, value] of Object.entries(groupedList)) {
                  if (key === o) {
                    return value.length;
                  }
                }
            };

            const value = getValue();

            return (
              <ul
                tabIndex="0"
                key={o}
                onClick={() => setFilterValue(o)}
                className={`${
                  o === filterValue ? "bg-opacity-100" : "hover:bg-opacity-30"
                } bg-blue-400 bg-opacity-0 px-5 py-1  duration-200 flex items-center gap-2 `}
              >
                <FaListUl />
                <p className="flex justify-between w-full">
                  <span>{o}</span>
                  <span>{value}</span>
                </p>
              </ul>
            );
          })}
          <ul
            tabIndex="0"
            onClick={() => setFilterValue("Finished")}
            className={`${
              filterValue === "Finished"
                ? "bg-opacity-100"
                : "hover:bg-opacity-30"
            } bg-blue-400 bg-opacity-0  px-2 pl-2 pr-5 duration-200 flex items-center gap-2`}
          >
            <FaCheckSquare />
            <p className="flex justify-between w-full">
              <span> Finished</span>
              <span>{groupedStatus?.Done.length}</span>
            </p>
          </ul>
        </Select>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-xl">
          <FaSearch />
        </p>
        <FaEllipsisV />
      </div>
    </div>
  );
}
