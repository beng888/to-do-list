import Input from "utils/Input";
import Select from "utils/Select";

export default function Form({ toDo, setToDo, options }) {
  const { text, list, date, time } = toDo;
  const handleChange = (e) => {
    setToDo({ ...toDo, [e.target.name]: e.target.value });
  };

  return (
    <form autoComplete="off" className="grid max-w-3xl gap-12 p-4 mx-auto mt-8">
      <div>
        <label className="mb-2" htmlFor="text">
          What is to be done?
        </label>
        <Input
          value={text}
          type="text"
          onChange={handleChange}
          remove={() => setToDo({ ...toDo, text: "" })}
        >
          Enter Task Here
        </Input>
      </div>
      <div>
        <p className="mb-2">Due date </p>
        <Input
          value={date}
          type="date"
          onChange={handleChange}
          remove={() => setToDo({ ...toDo, date: "", time: "" })}
        >
          Date not set
        </Input>
        {date && (
          <Input
            value={time}
            type="time"
            onChange={handleChange}
            remove={() => setToDo({ ...toDo, time: "" })}
          >
            Time not set (all day)
          </Input>
        )}
      </div>
      <div>
        <p className="mb-2">Add to List?</p>
        <Select selected={list}>
          {options.map((o) => (
            <ul
              tabIndex="0"
              key={o}
              onClick={() => setToDo({ ...toDo, list: o })}
              className={`${
                o === list ? "bg-opacity-100" : "hover:bg-opacity-30"
              } bg-blue-400 bg-opacity-0  p-2 duration-200`}
            >
              {o}
            </ul>
          ))}
        </Select>
      </div>
    </form>
  );
}
