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
  const URL = "https://v1.nocodeapi.com/beng88/google_sheets/PzluirzcnArJpwbm",
    tabId = "tabId=Sheet1",
    searchKey = "searchKey=created_at",
    options = ["Default", "Personal", "Shopping", "Wishlist", "Work"],
    initialState = {
      text: "",
      list: "Default",
      date: "",
      time: "",
      row_id: null,
    };

  const [user, setUser] = useState({ email: "", firstTask: true, done: [] }),
    [toDoTask, setToDoTask] = useState(initialState),
    [forUpdate, setForUpdate] = useState(false),
    [forDelete, setForDelete] = useState(false),
    [filter, setFilter] = useState("All Lists"),
    [loading, setLoading] = useState(false),
    [style, setStyle] = useState({
      showNewTask: false,
      confirmationModalOpen: false,
    }),
    { text, list, date, time, row_id } = toDoTask;

  const [state, dispatch] = React.useReducer(todoReducer, {
    todos: [],
  });

  useEffect(() => {
    localStorage.setItem("userValue", JSON.stringify(user));
  }, [user]);

  /* -------------------------------------------------------------------------- */
  /*                               CRUD OPERATIONS                              */
  /* -------------------------------------------------------------------------- */

  /* ------------------------------- RESET STATES ------------------------------ */

  const restart = () => {
    setToDoTask(initialState);
    setForUpdate(false);
    setLoading(false);
    setStyle({
      ...style,
      showNewTask: false,
      confirmationModalOpen: false,
    });
  };

  /* -------------------------------- GET TODOS ------------------------------- */

  useEffect(() => {
    axios.get(`${URL}?${tabId}`).then((res) => {
      dispatch({
        type: GET_TODOS,
        payload: { data: res.data.data, user: user.email },
      });
      console.log(res);
    });
  }, []);

  /* -------------------------------- ADD TODO -------------------------------- */

  const addTodo = () => {
    setLoading(true);
    axios
      .post(`${URL}?${tabId}`, [
        ["Ongoing", text, list, date, time, user.email, Date.now()],
      ])
      .then((res) => {
        dispatch({
          type: ADD_TODO,
          payload: {
            row_id: "",
            status: "Ongoing",
            text: text,
            list: list,
            date: date,
            time: time,
            user: user.email,
            created_at: Date.now(),
          },
        });
        restart();
        if (res.status === 200 && user.firstTask) {
          setUser({ ...user, firstTask: false });
          // localStorage.setItem("userValue", JSON.stringify(user));
        }
        console.log(res);
      });
  };

  /* --------------------------- TOGGLE TODO STATUS --------------------------- */

  const toggleTodo = async (id, status) => {
    dispatch({
      type: UPDATING_TODO,
      payload: { id, status: "Updating" },
    });
    axios
      .get(`${URL}/search?${tabId}&${searchKey}&searchValue=${id}`)
      .then((res) => {
        axios
          .put(`${URL}?${tabId}&row_id=${res.data[0].row_id}`, {
            row_id: res.data[0].row_id,
            status: status,
          })
          .then((res) => {
            dispatch({
              type: TOGGLE_TODO,
              payload: { id: id, status: status },
            });
            console.log(res);
          });
      });
  };

  /* ------------------------------- UPDATE TODO ------------------------------ */

  const updateTodo = (id) => {
    setLoading(true);
    const data = {
      row_id: row_id,
      status: "Ongoing",
      text: text,
      list: list,
      date: date,
      time: time,
      user: user.email,
      created_at: id,
    };
    axios
      .get(`${URL}/search?${tabId}&${searchKey}&searchValue=${id}`)
      .then((res) => {
        axios.put(`${URL}?${tabId}&row_id=${row_id}`, data).then((res) => {
          dispatch({
            type: UPDATE_TODO,
            payload: data,
          });

          restart();
          console.log(res);
        });
      });
  };

  /* ------------------------------- DELETE TODO ------------------------------ */

  const deleteTodo = (id) => {
    forDelete && setUser({ ...user, done: [...user.done, id] });
    setForDelete(false);
    dispatch({
      type: UPDATING_TODO,
      payload: { id, status: "Deleting" },
    });
    axios
      .get(`${URL}/search?${tabId}&${searchKey}&searchValue=${id}`)
      .then((res) => {
        axios
          .delete(`${URL}?${tabId}&row_id=${res.data[0].row_id}`)
          .then((res) => {
            dispatch({
              type: DELETE_TODO,
              payload: id,
            });
            restart();
            console.log(res);
          });
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                                 CONTEXT API                                */
  /* -------------------------------------------------------------------------- */

  return (
    <GlobalContext.Provider
      value={{
        addTodo,
        toggleTodo,
        updateTodo,
        deleteTodo,
        loading: loading,
        todos: state.todos,
        reset: initialState,
        listOptions: options,
        user: [user, setUser],
        style: [style, setStyle],
        filter: [filter, setFilter],
        toDoTask: [toDoTask, setToDoTask],
        forUpdate: [forUpdate, setForUpdate],
        forDelete: [forDelete, setForDelete],
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default function useGlobalContext() {
  return useContext(GlobalContext);
}
