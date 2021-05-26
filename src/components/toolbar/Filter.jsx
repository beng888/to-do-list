import { GiHouse } from "react-icons/gi";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaListUl, FaCheckSquare } from "react-icons/fa";

import { groupBy } from "helpers";
import Select from "utils/Select";

export default function Filter({
  listOptions,
  filter,
  todos,
  setFilter,
  searching,
}) {
  const [groupedStatus, setGroupedStatus] = useState(null),
    [groupedList, setGroupedList] = useState(null);

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
    <div className="absolute left-0 z-50 pointer-events-none -top-5">
      <div
        className={`${
          searching ? "-translate-x-full" : "pointer-events-auto"
        } transform duration-1000 flex items-center`}
      >
        <FaCheckCircle className="z-10 mr-2 text-3xl" />
        <Select selected={filter} arrowClass="-translate-x-14">
          <ul
            tabIndex="0"
            onClick={() => setFilter("All Lists")}
            className={`${
              filter === "All Lists" ? "bg-opacity-100" : "hover:bg-opacity-30"
            } bg-blue-400 bg-opacity-0 pl-2 py-2 pr-5 duration-200 text-xl flex items-center gap-2`}
          >
            <GiHouse />{" "}
            <p className="flex justify-between w-full">
              <span> All Lists</span>
              <span>
                {groupedStatus?.Ongoing.length > 0 &&
                  groupedStatus.Ongoing.length}
              </span>
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
                onClick={() => setFilter(o)}
                className={`${
                  o === filter ? "bg-opacity-100" : "hover:bg-opacity-30"
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
            onClick={() => setFilter("Finished")}
            className={`${
              filter === "Finished" ? "bg-opacity-100" : "hover:bg-opacity-30"
            } bg-blue-400 bg-opacity-0  pl-2 py-2 pr-5 duration-200 flex items-center gap-2`}
          >
            <FaCheckSquare />
            <p className="flex justify-between w-full">
              <span> Finished</span>
              <span>
                {groupedStatus?.Done.length > 0 && groupedStatus.Done.length}
              </span>
            </p>
          </ul>
        </Select>{" "}
      </div>
    </div>
  );
}
