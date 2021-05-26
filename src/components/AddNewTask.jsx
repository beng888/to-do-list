import React, { useEffect } from "react";
import {
  FaPlus,
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
  FaCircle,
} from "react-icons/fa";
import useGlobalContext from "context";

export default function AddNewTask({ addTask, animate }) {
  const { style, filteredList, todos } = useGlobalContext(),
    [styleValue, setStyleValue] = style,
    [filteredListValue] = filteredList;

  useEffect(() => {
    setStyleValue({
      ...styleValue,
      slides: Math.ceil(filteredListValue.length / 10),
    });
  }, [filteredListValue, todos]);

  return (
    <div className="absolute flex items-center justify-center w-full text-gray-200 pointer-events-none bottom-16 ">
      <div
        className={`flex gap-x-4 invisible ${
          filteredListValue.length > 10 &&
          styleValue.slides >= 1 &&
          "sm:visible"
        }`}
      >
        <FaRegArrowAltCircleLeft
          className={`text-4xl pointer-events-auto button ${
            styleValue.currentSlide === 1 && "opacity-40"
          }`}
          onClick={() =>
            setStyleValue({
              ...styleValue,
              currentSlide:
                styleValue.currentSlide > 1 ? styleValue.currentSlide - 1 : 1,
            })
          }
        />
        <div className="flex items-center pointer-events-auto gap-x-3">
          {[...Array(styleValue.slides).keys()].map((v, i) => (
            <FaCircle
              key={i}
              className={`${
                styleValue.currentSlide === i + 1 && "text-blue-7"
              } text-xs duration-300 cursor-pointer hover:opacity-50`}
              onClick={() =>
                setStyleValue({
                  ...styleValue,
                  currentSlide: i + 1,
                })
              }
            />
          ))}
        </div>
        <FaRegArrowAltCircleRight
          className={`text-4xl pointer-events-auto button ${
            styleValue.currentSlide === styleValue.slides && "opacity-40"
          }`}
          onClick={() =>
            setStyleValue({
              ...styleValue,
              currentSlide:
                styleValue.currentSlide < styleValue.slides
                  ? styleValue.currentSlide + 1
                  : styleValue.slides,
            })
          }
        />
      </div>

      <div
        onClick={() => addTask()}
        className={`${
          animate && "animate-beat"
        } absolute p-4 text-2xl pointer-events-auto text-blue-100 bg-black rounded-full shadow-xl cursor-pointer max-w-max right-8`}
      >
        <FaPlus />
      </div>
    </div>
  );
}
