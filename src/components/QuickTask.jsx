import Input from "utils/Input";
import useGlobalContext from "context";
import { GiCheckMark } from "react-icons/gi";
import { RiLoaderFill } from "react-icons/ri";

export default function Quicktask() {
  const { toDoTask, addTodo, loading } = useGlobalContext();
  const [toDoTaskValue, setToDoTaskValue] = toDoTask;

  return (
    <div className="fixed bottom-0 flex w-full px-2 pt-2 bg-indigo-500">
      <div className="w-full">
        <Input
          type="text"
          value={toDoTaskValue.text}
          onChange={(e) =>
            setToDoTaskValue({ ...toDoTaskValue, text: e.target.value })
          }
          remove={false}
        >
          Enter Quick Task Here
        </Input>
      </div>

      {toDoTaskValue.text && (
        <div className="mx-2 text-2xl text-white cursor-pointer max-w-min">
          {loading ? (
            <RiLoaderFill className="animate-spin" />
          ) : (
            <GiCheckMark onClick={() => addTodo()} />
          )}
        </div>
      )}
    </div>
  );
}
