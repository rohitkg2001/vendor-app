import { VIEW_TASK, UPDATE_TASK } from "../constant";

export const viewTask = (taskId) => async (dispatch, getState) => {
  const { tasks } = getState();
  const task = tasks.find((task) => task.id === taskId);

  if (task) {
    await dispatch({ type: VIEW_TASK, payload: task });
    return true;
  } else {
    console.error("Task not found");
    return false;
  }
};

export const updateTask =
  (taskId, updatedTaskData) => async (dispatch, getState) => {
    const { tasks } = getState();
    const taskIndex = tasks.findIndex((task) => task.id === taskId);

    if (taskIndex !== -1) {
      const updatedTask = { ...tasks[taskIndex], ...updatedTaskData };

      await dispatch({ type: UPDATE_TASK, payload: updatedTask });

      return true;
    } else {
      console.error("Task not found");
      return false;
    }
  };
