import * as $ from "components";
import useGlobalContext from "context";
import { useEffect } from "react";

function App() {
  const { style, user, filteredList, getTodos } = useGlobalContext(),
    [styleValue, setstyleValue] = style,
    [filteredListValue] = filteredList,
    open = styleValue.showNewTask,
    [userValue] = user;

  // const ref = useRef(true);

  // ref.current && getTodos();
  // ref.current = false;

  useEffect(() => {
    getTodos();
  }, []);

  console.log(process.env.REACT_APP_API_URL);
  console.log(process.env.REACT_APP_TAB_ID);
  console.log(process.env.REACT_APP_SEARCH_KEY);
  return (
    <div className="relative w-screen h-screen max-h-screen overflow-hidden max-w-100vw">
      <$.WelcomeScreen />
      <$.ToolBar />
      <$.Shadow open={open} />
      <div
        className={` w-full h-full items-center flex flex-col primary-bg transform duration-500 ${
          open ? "-translate-x-1/3" : "translate-x-0"
        }`}
      >
        {filteredListValue < 1 && userValue.firstTask ? (
          <$.AddFirstTask />
        ) : filteredListValue < 1 ? (
          <$.NoTasks />
        ) : (
          <$.ToDoList />
        )}
        <$.AddNewTask
          addTask={() => setstyleValue({ ...styleValue, showNewTask: true })}
          animate={userValue.firstTask}
        />{" "}
      </div>
      <$.QuickTask />
      <$.NewTask open={open} />
      <$.ConfirmationModal />
      <$.Notification />
    </div>
  );
}

export default App;
