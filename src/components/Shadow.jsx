import useGlobalContext from "context";

export default function Shadow({ open, close }) {
  const { style, toDoTask, reset, forUpdate } = useGlobalContext(),
    [styleValue, setStyleValue] = style,
    [toDoTaskValue, setToDoTaskValue] = toDoTask,
    [forUpdateValue, setForUpdateValue] = forUpdate;

  const handleClick = () => {
    setToDoTaskValue(reset);
    setForUpdateValue(false);
    setStyleValue({
      ...styleValue,
      showNewTask: false,
    });
  };

  return (
    <div
      onClick={() => handleClick()}
      className={`absolute inset-0 bg-black z-20 duration-500 ${
        open ? "bg-opacity-60" : "bg-opacity-0 pointer-events-none"
      }`}
    />
  );
}
