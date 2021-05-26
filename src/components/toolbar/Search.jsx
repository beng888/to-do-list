import React from "react";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import Input from "utils/Input";

export default function Search({
  searchValue,
  setSearchValue,
  setStyleValue,
  styleValue,
}) {
  return (
    <div className="relative flex items-center">
      <div className="overflow-hidden">
        <form
          autoComplete="off"
          className={`${
            !styleValue.searching && "scale-x-0 origin-right"
          } transform duration-1000 w-max`}
        >
          <Input
            value={searchValue}
            type="text"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            focused={styleValue.searching}
          >
            Search
          </Input>
        </form>
      </div>
      <div
        onClick={() => {
          setStyleValue({ ...styleValue, searching: !styleValue.searching });
          setSearchValue("");
        }}
        className="ml-4 mr-2 text-2xl cursor-pointer"
      >
        {styleValue.searching ? <FaArrowRight /> : <FaSearch />}
      </div>
    </div>
  );
}
