import { VIEW_TASK, UPDATE_TASK, BASE_URL, GET_ALL_TASKS } from "../constant";
import { filterByStatus } from "./projectActions";
import axios from "axios";

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
    const response = await axios.get(`${BASE_URL}/api/task`);
    const { data } = await response

    const myTasks =
      Array.isArray(data) && data.filter((task) => task.vendor_id === my_id);
    // console.log(myTasks);
    dispatch({ type: GET_ALL_TASKS, payload: myTasks });
  } catch (error) {
    console.error(`Error fetching tasks by vendor id: ${error.message}`);
  }
};

export const getAllInstallationCount = async (my_id, category) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/task`);
    const { data } = await response

    const myTasks =
      Array.isArray(data) && data.filter((task) => task.vendor_id === my_id && task.activity.toLowerCase() === category.toLowerCase());
    return myTasks.length;
  } catch (error) {
    console.error(`Error fetching tasks by Status: ${error.message}`);
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

export const updateTask = (taskId, dataToUpdate) => async (dispatch) => {
  try {
    const { date, description, image, file, lat, long } = dataToUpdate;
    const formData = new FormData();
    if (file) {
      const { uri, name, mimeType } = file;
      formData.append("image[]", {
        uri, // Local file URI
        name, // File name
        type: mimeType, // File type
      });
    }
    if (image) {
      Array.isArray(image) && image.forEach((item, index) => {
        formData.append(`image[${index}]`, {
          uri: item.startsWith("file://") ? item : `file:/${item}`, // Local file URI
          name: `photo_${index}.jpg`, // File name
          type: "image/jpeg", // File type
        });
      });
    }
    formData.append("status", "In Progress");
    formData.append("description", description);
    formData.append("lat", lat);
    formData.append('long', long);
    formData.append("_method", "PUT")
    // Debug FormData structure
    const response = await axios.post(`${BASE_URL}/api/task/${taskId}?_method=PUT`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensure proper headers
      },
    })
    const { data, status } = await response
    dispatch({ type: UPDATE_TASK, payload: data });
    return status
  } catch (error) {
    console.log(error.message)
  }
};


// 0=INSTALLATION
// 1 = FIXING SLIP
// 2=RMS
// 3 = INSPECTION
// 4=Report Sent
