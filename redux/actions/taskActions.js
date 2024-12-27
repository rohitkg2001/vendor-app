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
  }
];


export const getAllTasks = (my_id) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/api/task`);
    const data = await response.json();

    const myTasks =
      Array.isArray(data) && data.filter((task) => task.vendor_id === my_id);
    // console.log(myTasks);
    dispatch({ type: GET_ALL_TASKS, payload: myTasks });
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

export const updateTask = (taskId, updatedTaskData) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/api/task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTaskData)
    });

    const updatedTask = await response.json();
    console.log(updatedTask);
    // await dispatch({ type: UPDATE_TASK, payload: updatedTask });
    // return true;
  } catch (error) {
    console.error(error);
  }
};

// 0=INSTALLATION
// 1 = FIXING SLIP
// 2=RMS
// 3 = INSPECTION
// 4=Report Sent
