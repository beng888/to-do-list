import * as $ from "components";
import useGlobalContext from "context";

function App() {
  const { style, user, filteredList } = useGlobalContext(),
    [styleValue, setstyleValue] = style,
    [filteredListValue] = filteredList,
    open = styleValue.showNewTask,
    [userValue] = user;

  return (
    <div className="relative w-screen h-screen max-h-screen overflow-hidden max-w-100vw">
      <$.WelcomeScreen />
      <$.Shadow
        open={open}
        close={() => setstyleValue({ ...styleValue, showNewTask: false })}
      />
      <div
        className={` w-full h-full items-center flex flex-col primary-bg transform duration-500 ${
          open ? "-translate-x-1/3 sm:translate-x-0" : "translate-x-0"
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
        />
      </div>
      <$.QuickTask />
      <$.NewTask open={open} />
      <$.ToolBar />
      <$.ConfirmationModal />
      <$.Notification />
    </div>
  );
}

export default App;
