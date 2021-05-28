import React, { useEffect } from "react";
import {
  FaPlus,
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
  FaCircle,
} from "react-icons/fa";
import useGlobalContext from "context";

export default function AddNewTask({ addTask, animate }) {
  const { filteredList, slide, currentSlide } = useGlobalContext(),
    [slideValue, setSlideValue] = slide,
    [filteredListValue] = filteredList,
    [currentSlideValue, setCurrentSlideValue] = currentSlide;

  useEffect(() => {
    const length = Math.ceil(filteredListValue.length / 10);
    setSlideValue(length);
    if (currentSlideValue > 1 && currentSlideValue > slideValue) {
      setCurrentSlideValue(slideValue);
    }
  }, [filteredListValue, slideValue]);

  return (
    <div className="absolute flex items-center justify-center w-full text-gray-200 pointer-events-none bottom-16 ">
      <div
        className={`flex gap-x-4 invisible ${
          filteredListValue.length > 10 && slideValue > 1 && "sm:visible"
        }`}
      >
        <FaRegArrowAltCircleLeft
          className={`text-4xl pointer-events-auto button ${
            currentSlideValue === 1 && "opacity-40"
          }`}
          onClick={() =>
            setCurrentSlideValue(
              currentSlideValue > 1 ? currentSlideValue - 1 : 1
            )
          }
        />
        <div className="flex items-center pointer-events-auto gap-x-3">
          {[...Array(slideValue).keys()].map((v, i) => (
            <FaCircle
              key={i}
              className={`${
                currentSlideValue === i + 1 && "text-blue-7"
              } text-xs duration-300 cursor-pointer hover:opacity-50`}
              onClick={() => setCurrentSlideValue(i + 1)}
            />
          ))}
        </div>
        <FaRegArrowAltCircleRight
          className={`text-4xl pointer-events-auto button ${
            currentSlideValue === slideValue && "opacity-40"
          }`}
          onClick={() =>
            setCurrentSlideValue(
              currentSlideValue < slideValue
                ? currentSlideValue + 1
                : slideValue
            )
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
