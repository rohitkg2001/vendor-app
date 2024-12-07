import { VIEW_TASK, UPDATE_TASK, BASE_URL, GET_ALL_TASKS } from "../constant";
import { filterByStatus } from "./projectActions";

export const INSTALLATION = filterByStatus([], 0);
export const FIXING_SLIP = filterByStatus([], 1);
export const RMS = filterByStatus([], 2);
export const INSPECTION = filterByStatus([], 3);
export const REPORT = filterByStatus([], 4);

export const tasksCounts = [
  {
    id: "1",
    label: "Installation",
    icon: "layers-outline",
    count: INSTALLATION.length,
  },
  {
    id: "3",
    label: "RMS Status",
    icon: "cart-outline",
    count: RMS.length,
  },
  {
    id: "4",
    label: "Final Inspection",
    icon: "document-text-outline",
    count: INSPECTION.length,
  },
  
];

export const getAllTasks = () => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/api/tasks`);
    const data = await response.json();
    console.log(data)
    dispatch({ type: GET_ALL_TASKS, payload: data });
  } catch (error) {
    console.error(error);
  }
};

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

// 0=INSTALLATION
// 1 = FIXING SLIP
// 2=RMS
// 3 = INSPECTION
// 4=Report Sent
