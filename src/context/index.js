import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import todoReducer from "./todo-reducer";
import {
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  UPDATE_TODO,
  UPDATING_TODO,
  GET_TODOS,
} from "./todo-actions";

const GlobalContext = React.createContext();

export function GlobalContextWrapper({ children }) {
  const URL = process.env.REACT_APP_API_URL,
    tabId = process.env.REACT_APP_TAB_ID,
    searchKey = process.env.REACT_APP_SEARCH_KEY,
    options = ["Default", "Personal", "Shopping", "Wishlist", "Work"],
    initialState = {
      text: "",
      list: "Default",
      date: "",
      time: "",
      row_id: "",
    };

  const [state, dispatch] = React.useReducer(todoReducer, { todos: [] }),
    [notification, setNotification] = useState({ active: false, text: "" }),
    [user, setUser] = useState({ email: "", firstTask: true, done: [] }),
    [toDoTask, setToDoTask] = useState(initialState),
    [filteredList, setFilteredList] = useState([]),
    [filter, setFilter] = useState("All Lists"),
    [forUpdate, setForUpdate] = useState(false),
    [forDelete, setForDelete] = useState(false),
    [loading, setLoading] = useState(false),
    [search, setSearch] = useState(""),
    [slide, setSlide] = useState(1),
    [currentSlide, setCurrentSlide] = useState(1),
    [style, setStyle] = useState({
      searching: false,
      showNewTask: false,
      confirmationModalOpen: false,
    }),
    { text, list, date, time, row_id } = toDoTask;

  /* ------------------------------- RESET STATES ------------------------------ */

  const restart = () => {
    setToDoTask(initialState);
    setForUpdate(false);
    setLoading(false);
    setStyle({
      ...style,
      searching: false,
      showNewTask: false,
      confirmationModalOpen: false,
    });
  };

  notification.active &&
    setTimeout(() => {
      setNotification({ text: "", active: false });
    }, 2500);

  //* -------------------------------------------------------------------------- */
  //*                               CRUD OPERATIONS                              */
  //* -------------------------------------------------------------------------- */

  const data = {
    row_id: row_id,
    status: "Ongoing",
    text: text,
    list: list,
    date: date,
    time: time,
    user: user.email,
    created_at: null,
  };

  const handleData = (log, type, status, message, created_at) => {
    console.log(log);

    dispatch({
      type: type,
      payload: {
        ...data,
        status: status,
        created_at: created_at,
      },
    });

    message === "Task Added" &&
      setFilter(list === "Default" ? "All Lists" : list);

    filter !== "Finished" && setFilter(list === "Default" ? "All Lists" : list);

    setNotification({ active: true, text: message });
    restart();
    if (user.firstTask) {
      setUser({ ...user, firstTask: false });
      localStorage.setItem("userValue", JSON.stringify(user));
    }
  };

  // * -------------------------------- GET TODOS ------------------------------- */

  const getTodos = (email) => {
    axios
      .get(`${URL}?${tabId}`)
      .then((res) => {
        console.log(res);
        dispatch({
          type: GET_TODOS,
          payload: { data: res.data.data, user: email },
        });
      })
      .catch((err) => {
        console.log(err);
        const storageData = JSON.parse(localStorage.getItem("todoList"));
        storageData &&
          dispatch({
            type: GET_TODOS,
            payload: {
              data: storageData,
              user: user.email,
            },
          });
      });
  };

  //* -------------------------------- ADD TODO -------------------------------- */

  const addTodo = () => {
    setLoading(true);

    axios
      .post(`${URL}?${tabId}`, [
        ["Ongoing", text, list, date, time, user.email, Date.now()],
      ])
      .then((res) => {
        handleData(res, ADD_TODO, "Ongoing", "Task Added", Date.now());
      })
      .catch((err) => {
        handleData(err, ADD_TODO, "Ongoing", "Task Added", Date.now());
      });
  };

  //* --------------------------- TOGGLE TODO STATUS --------------------------- */

  const toggleTodo = async (id, status) => {
    dispatch({
      type: UPDATING_TODO,
      payload: { created_at: id, status: "Updating" },
    });
    const message =
      status === "Done" ? "Task Finished" : "Task forwarded to redo";
    axios
      .get(`${URL}/search?${tabId}&${searchKey}&searchValue=${id}`)
      .then((res) => {
        axios
          .put(`${URL}?${tabId}&row_id=${res.data[0].row_id}`, {
            row_id: res.data[0].row_id,
            status: status,
          })
          .then((res) => {
            handleData(res, TOGGLE_TODO, status, message, id);
          });
      })
      .catch((err) => {
        handleData(err, TOGGLE_TODO, status, message, id);
      });
  };

  //* ------------------------------- UPDATE TODO ------------------------------ */

  const updateTodo = (id) => {
    setLoading(true);

    axios
      .get(`${URL}/search?${tabId}&${searchKey}&searchValue=${id}`)
      .then((res) => {
        axios
          .put(`${URL}?${tabId}&row_id=${res.data[0].row_id}`, {
            ...data,
            created_at: id,
          })
          .then((res) => {
            handleData(res, UPDATE_TODO, "Ongoing", "Task Updated", id);
          });
      })
      .catch((err) => {
        handleData(err, UPDATE_TODO, "Ongoing", "Task Updated", id);
      });
  };

  //* ------------------------------- DELETE TODO ------------------------------ */

  const deleteTodo = (id) => {
    forDelete && setUser({ ...user, done: [...user.done, id] });
    localStorage.setItem("userValue", JSON.stringify(user));
    setForDelete(false);
    dispatch({
      type: UPDATING_TODO,
      payload: { created_at: id, status: "Deleting" },
    });
    axios
      .get(`${URL}/search?${tabId}&${searchKey}&searchValue=${id}`)
      .then((res) => {
        axios
          .delete(`${URL}?${tabId}&row_id=${res.data[0].row_id}`)
          .then((res) => {
            handleData(res, DELETE_TODO, "", "Task Deleted", id);
          });
      })
      .catch((err) => {
        handleData(err, DELETE_TODO, "", "Task Deleted", id);
      });
  };

  //* -------------------------------------------------------------------------- */
  //*                                 CONTEXT API                                */
  //* -------------------------------------------------------------------------- */

  return (
    <GlobalContext.Provider
      value={{
        addTodo,
        getTodos,
        toggleTodo,
        updateTodo,
        deleteTodo,
        loading: loading,
        todos: state.todos,
        reset: initialState,
        listOptions: options,
        user: [user, setUser],
        style: [style, setStyle],
        slide: [slide, setSlide],
        currentSlide: [currentSlide, setCurrentSlide],
        filter: [filter, setFilter],
        search: [search, setSearch],
        toDoTask: [toDoTask, setToDoTask],
        forUpdate: [forUpdate, setForUpdate],
        forDelete: [forDelete, setForDelete],
        filteredList: [filteredList, setFilteredList],
        notification: [notification, setNotification],
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default function useGlobalContext() {
  return useContext(GlobalContext);
}
