import * as $ from "components";
import useGlobalContext from "context";

function App() {
  const { style, todos, user } = useGlobalContext();
  const [styleValue, setstyleValue] = style;
  const [userValue] = user;
  const open = styleValue.showNewTask;

  return (
    <div className="relative w-screen h-screen max-h-screen overflow-hidden max-w-100vw">
      <div
        className={`grid w-full h-full place-content-center primary-bg transform duration-500 ${
          open ? "-translate-x-1/3" : "translate-x-0"
        }`}
      >
        <$.WelcomeScreen />
        <$.ToolBar />
        <$.Shadow open={open} />
        {todos.length < 1 && userValue.firstTask ? (
          <$.AddFirstTask />
        ) : todos.length < 1 ? (
          <div className="text-center text-white">
            <img
              src="./images/hammock.png"
              alt="hammock"
              className="max-h-30vh"
            />
            <br />
            <p>Nothing to do</p>
          </div>
        ) : (
          <$.ToDoList />
        )}
        <$.AddNewTask
          addTask={() => setstyleValue({ ...styleValue, showNewTask: true })}
          animate={userValue.firstTask}
        />
        <$.QuickTask />
      </div>
      <$.NewTask open={open} />
      <$.ConfirmationModal />
    </div>
  );
}

export default App;
