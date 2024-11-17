import { initialState, UPDATE_TASK, VIEW_TASK } from "../constant";

export const taskReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case VIEW_TASK:
      return { ...state, currentTask: payload };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === payload.id ? { ...task, ...payload } : task
        ),
      };

    default:
      return state;
  }
};
