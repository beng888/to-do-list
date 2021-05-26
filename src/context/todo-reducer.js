import {
  ADD_TODO,
  TOGGLE_TODO,
  UPDATE_TODO,
  UPDATING_TODO,
  DELETE_TODO,
  GET_TODOS,
} from "./todo-actions";

const todoReducer = (state, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload.data.filter(
          (i) => i.user !== action.payload.user
        ),
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.created_at === action.payload.created_at
            ? { ...todo, status: action.payload.status }
            : todo
        ),
      };
    case UPDATING_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.created_at === action.payload.created_at
            ? { ...todo, status: action.payload.status }
            : todo
        ),
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.created_at === action.payload.created_at ? action.payload : todo
        ),
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(
          (todo) => todo.created_at !== action.payload.created_at
        ),
      };
    default:
      return state;
  }
};

export default todoReducer;
