import { UPDATE_TASK, VIEW_TASK, GET_ALL_TASKS } from "../constant";

const initialState = {
  tasks: [],
  currentTask: null,
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      return { ...state, tasks: action.payload };
    case UPDATE_TASK:
      return { ...state, currentTask: action.payload };
    case VIEW_TASK:
      return {
        ...state,
        currentTask: state.tasks.find((task) => task.id === action.payload),
      };
    default:
      return state;
  }
};
