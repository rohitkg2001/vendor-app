import { VIEW_TASK, UPDATE_TASK } from "../constant";
import { inventory, tasks, sites, projects } from "../../utils/faker";
import { filterByStatus } from "./projectActions";

export const INSTALLATION = filterByStatus(tasks, 0);
export const FIXING_SLIP = filterByStatus(tasks, 1)
export const RMS = filterByStatus(tasks, 2)
export const INSPECTION = filterByStatus(tasks, 3)
export const REPORT = filterByStatus(tasks, 4)

export const tasksCounts = [
  {
    id: "1",
    label: "Installation",
    icon: "layers-outline",
    count: INSTALLATION.length,
  },
  {
    id: "2",
    label: "Fixing Slip",
    icon: "grid-outline",
    count: FIXING_SLIP.length,
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
  {
    id: "5",
    label: "Report",
    icon: "pie-chart-outline",
    count: REPORT.length,
  },
]

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