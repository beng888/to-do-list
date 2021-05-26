import { useEffect, useState } from "react";
import Filter from "./Filter";
import Search from "./Search";
import useGlobalContext from "context";

export default function ToolBar() {
  const { todos, filter, filteredList, listOptions, search, style } =
      useGlobalContext(),
    [filteredListValue, setFilteredListValue] = filteredList,
    [searchValue, setSearchValue] = search,
    [styleValue, setStyleValue] = style,
    [filterValue, setFilterValue] = filter;

  const [openSearch, setOpenSearch] = useState(false);

  /* ---------------------------- FILTER TODO LIST ---------------------------- */

  useEffect(() => {
    if (styleValue.searching) {
      const Ongoing = todos.filter((i) => i.status !== "Done");
      setFilteredListValue(Ongoing.filter((i) => i.text.includes(searchValue)));
    } else {
      if (filterValue === "All Lists") {
        setFilteredListValue(todos.filter((i) => i.status !== "Done"));
      } else if (filterValue !== "Finished") {
        setFilteredListValue(
          todos
            .filter((i) => i.list === filterValue)
            .filter((i) => i.status !== "Done")
        );
      } else setFilteredListValue(todos.filter((i) => i.status !== "Ongoing"));
    }
  }, [todos, filterValue, searchValue]);

  useEffect(() => {
    todos.length > 0 && localStorage.setItem("todoList", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="fixed top-0 z-10 flex items-center justify-between w-full h-16 px-4 text-lg text-white shadow-lg primary-bg-2">
      <div className="relative">
        <Filter
          setFilter={setFilterValue}
          filter={filterValue}
          listOptions={listOptions}
          todos={todos}
          searching={styleValue.searching}
        />
      </div>

      <Search
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setStyleValue={setStyleValue}
        styleValue={styleValue}
      />
    </div>
  );
}
