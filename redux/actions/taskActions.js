import {
  VIEW_TASK,
  UPDATE_TASK,
  BASE_URL,
  GET_ALL_TASKS,
  TOTAL_PENDING_STREETLIGHT,
  GET_PENDING_STREETLIGHTS,
  GET_SURVEYED_STREETLIGHTS,
  TOTAL_SURVEYED_STREETLIGHTS,
  GET_INSTALLED_STREETLIGHTS,
  TOTAL_INSTALLED_STREETLIGHTS,
  GET_VIEW_STREETLIGHTS,
} from "../constant";
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
  },
];

export const getAllTasks = (my_id) => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/task`);
    const { data } = await response;

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
    const { data } = response;
    const myTasks =
      Array.isArray(data) &&
      data.filter(
        (task) =>
          task.vendor_id === my_id &&
          task.activity.toLowerCase() === category.toLowerCase()
      );
    // Ye line ne jis type ka task hai wo return kar diya. Ab next hum isme ye check karenge ki myTasks k
    // site object me kya kya hai
    const pendingTasks = myTasks.filter((myTask, id) => myTask.image === null);
    // Agar image null hai iska matlab usme kuch upload nahi kiya gaya hai to iska matlab wo tasks
    // pending hai Ab vendor survey karega aur task submit karega khatm karke to upar wale function se tumko
    // pending tasks ka array mil gaya
    const inApprovalTasks = myTasks.filter(
      (myTask) =>
        myTask.site?.actual_latitude !== null &&
        myTask.site?.actual_longitude !== null &&
        myTask.status === "In Progress"
    );
    // Is bad humne check kiya ki image array empty nahi hai, task k site me survey and actual location hai?
    // Aur status kya hai. Agar In Progress hai to humne use inApprovalTasks me dal diya
    const approvedTasks = myTasks.filter((myTask) => myTask.status === "Done");
    // Lastly approvedTasks me status dekh liya
    // return {
    //   totalTasks: myTasks.length,
    //   pendingTasks: pendingTasks.length,
    //   inApprovalTasks: pendingTasks.length,
    //   approvedTasks: approvedTasks.length
    // }
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

export const getTaskById = (task_id) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/api/task/${task_id}`);
    const data = await response.json();
    dispatch({ type: VIEW_TASK, payload: data });
  } catch (err) {
    console.error(err);
  }
};

export const updateTask = (taskId, dataToUpdate) => async (dispatch) => {
  try {
    const { date, description, image, file, lat, long } = dataToUpdate;
    const formData = new FormData();
    let imageIndex = 0;
    if (file) {
      const { uri, name, mimeType } = file;
      formData.append(`image[${imageIndex}]`, {
        uri, // Local file URI
        name, // File name
        type: mimeType, // File type
      });
      imageIndex++;
    }
    if (image) {
      Array.isArray(image) &&
        image.forEach((item, index) => {
          formData.append(`image[${imageIndex}]`, {
            uri: item.startsWith("file://") ? item : `file:/${item}`, // Local file URI
            name: `photo_${imageIndex}.jpg`, // File name
            type: "image/jpeg", // File type
          });
          imageIndex;
        });
    }
    formData.append("status", "In Progress");
    // formData.append("date", date)
    formData.append("description", description);
    formData.append("lat", lat);
    formData.append("long", long);
    formData.append("_method", "PUT");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    // Debug FormData structure
    const response = await axios.post(
      `${BASE_URL}/api/task/${taskId}?_method=PUT`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure proper headers
        },
      }
    );
    const { data, status } = await response;
    dispatch({ type: UPDATE_TASK, payload: data });
    return status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios Error Detected");
      if (error.code === "ECONNABORTED") {
        console.log("Error: Request Timed Out");
      } else if (error.code === "ERR_NETWORK") {
        console.log("Error: Network Issue (Check internet connection)");
      } else if (error.response) {
        console.log(
          `Server responded with status ${error.response.status}:`,
          error.response.data
        );
      } else {
        console.log("Unknown Axios Error:", error.message);
      }
    } else {
      console.log("Non-Axios Error:", error);
    }
    if (error.response) {
      // Server responded with a status code out of the 2xx range
      console.log("Response Error:");
      console.log("Status:", error.response.status);
      console.log("Data:", error.response.data);
      console.log("Headers:", error.response.headers);
    } else if (error.request) {
      // Request was made but no response was received
      console.log("No Response Received:");
      console.log(error.request);
    } else {
      // Something went wrong in setting up the request
      console.log("Request Setup Error:", error.message);
    }
  }
};

export const surveyTask = (taskId, dataToUpdate) => async (dispatch) => {
  try {
    const { date, description, image, file, lat, long } = dataToUpdate;
    const formData = new FormData();
    let imageIndex = 0;
    if (file) {
      const { uri, name, mimeType } = file;
      formData.append(`image[${imageIndex}]`, {
        uri, // Local file URI
        name, // File name
        type: mimeType, // File type
      });
      imageIndex++; // Move to next index for images
    }
    if (image) {
      Array.isArray(image) &&
        image.forEach((item, index) => {
          formData.append(`image[${imageIndex}]`, {
            uri: item.startsWith("file://") ? item : `file:/${item}`, // Local file URI
            name: `photo_${imageIndex}.jpg`, // File name
            type: "image/jpeg", // File type
          });
          imageIndex++;
        });
    }
    formData.append("status", "In Progress");
    formData.append("description", description);
    formData.append("survey_lat", lat);
    formData.append("survey_long", long);
    formData.append("_method", "PUT");
    console.log(formData);
    // Debug FormData structure
    const response = await axios.post(
      `${BASE_URL}/api/task/${taskId}?_method=PUT`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure proper headers
        },
      }
    );
    const { data, status } = await response;
    dispatch({ type: UPDATE_TASK, payload: data });
    return status;
  } catch (error) {
    console.log(error.message);
  }
};

// 0=INSTALLATION
// 1 = FIXING SLIP
// 2=RMS
// 3 = INSPECTION
// 4=Report Sent

export const getStreetLightTasks = (my_id) => async (dispatch) => {
  const response = await axios.get(
    `${BASE_URL}/api/streetlight/tasks/vendors`,
    {
      params: { id: my_id },
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { data } = response;
  const pendingSites = data.filter((task) => task.status === "Pending");
  const pendingSitesCount = pendingSites.length;
  dispatch({ type: TOTAL_PENDING_STREETLIGHT, payload: pendingSitesCount });
  dispatch({ type: GET_PENDING_STREETLIGHTS, payload: pendingSites });
};

// export const submitStreetlightTasks = (dataToUpdate) => async (dispatch) => {
//   try {
//     console.log("Surveying");
//     console.log(dataToUpdate);
//     const response = await axios.put(
//       `${BASE_URL}/api/streetlight/tasks/update`,
//       dataToUpdate
//     );
//     const { data } = response;
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const submitStreetlightTasks =
//   (dataToUpdate, file) => async (dispatch) => {
//     try {
//       console.log("Surveying...");

//       const formData = new FormData();
//       let imageIndex = 0;

//       // ✅ Ensure task_id and complete_pole_number are included
//       if (!dataToUpdate.task_id || !dataToUpdate.complete_pole_number) {
//         console.error("Missing task_id or complete_pole_number");
//         return;
//       }

//       // ✅ Append all other fields
//       Object.entries(dataToUpdate).forEach(([key, value]) => {
//         if (value !== undefined && value !== null) {
//           formData.append(key, value);
//         }
//       });

//       // ✅ Append single file (if provided)
//       if (file) {
//         formData.append(`survey_image[${imageIndex}]`, {
//           uri: file.uri,
//           name: file.name || `photo_${imageIndex}.jpg`,
//           type: file.mimeType || "image/jpeg",
//         });
//         imageIndex++;
//       }

//       // ✅ Append multiple images
//       if (dataToUpdate.survey_image) {
//         dataToUpdate.survey_image.forEach((item) => {
//           formData.append(`survey_image[${imageIndex}]`, {
//             uri: item.uri.startsWith("file://")
//               ? item.uri
//               : `file:/${item.uri}`,
//             name: `photo_${imageIndex}.jpg`,
//             type: "image/jpeg",
//           });
//           imageIndex++;
//         });
//       }

//       // ✅ Debug: Print formData contents
//       for (let pair of formData.entries()) {
//         console.log(pair[0], pair[1]);
//       }

//       // ✅ Send POST request (instead of PUT)
//       const response = await axios.post(
//         `${BASE_URL}/api/streetlight/tasks/update`, // Ensure correct endpoint
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       console.log("Response Data:", response.data);
//     } catch (error) {
//       console.error("Error submitting data:", error.response?.data || error);
//     }
//   };

export const submitStreetlightTasks =
  (dataToUpdate, file) => async (dispatch) => {
    try {
      console.log("Surveying...");
      console.log("Data being sent:", dataToUpdate);

      const formData = new FormData();
      let imageIndex = 0;

      // ✅ Validate required fields
      if (!dataToUpdate?.task_id || !dataToUpdate?.complete_pole_number) {
        console.error("Missing task_id or complete_pole_number");
        return;
      }

      // ✅ Append required fields
      formData.append("task_id", String(dataToUpdate.task_id));
      formData.append(
        "complete_pole_number",
        String(dataToUpdate.complete_pole_number)
      );
      formData.append("beneficiary", String(dataToUpdate.beneficiary || ""));
      formData.append("contact", String(dataToUpdate.contact || ""));
      formData.append("remarks", String(dataToUpdate.remarks || ""));
      formData.append("lat", String(dataToUpdate.lat));
      formData.append("lng", String(dataToUpdate.lng));

      // ✅ Send Boolean values correctly
      formData.append(
        "isNetworkAvailable",
        dataToUpdate.isNetworkAvailable ? true : false
      );
      formData.append("isSurveyDone", dataToUpdate.isSurveyDone ? true : false);

      // ✅ Append single file (React Native format)
      if (file && file.uri) {
        formData.append(`survey_image[${imageIndex}]`, {
          uri: file.uri,
          name: file.name || `photo_${imageIndex}.jpg`,
          type: file.type || "image/jpeg",
        });
        imageIndex++;
      }

      // ✅ Append multiple images
      if (Array.isArray(dataToUpdate.survey_image)) {
        dataToUpdate.survey_image.forEach((item) => {
          if (item?.uri) {
            formData.append(`survey_image[${imageIndex}]`, {
              uri: item.uri,
              name: `photo_${imageIndex}.jpg`,
              type: "image/jpeg",
            });
            imageIndex++;
          }
        });
      }

      // ✅ Debug: Print formData contents
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // ✅ Send POST request (REMOVE "Content-Type" HEADER)
      const response = await axios.post(
        `${BASE_URL}/api/streetlight/tasks/update`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } } // Let axios set the correct Content-Type
      );

      console.log("Response Data:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error.response?.data || error);
    }
  };

export const getInstalledPoles = (vendor_id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/installed-poles/vendor/${vendor_id}`
    );
    const { data } = response;
    ``;
    const { installed_poles, surveyed_poles } = data;
    dispatch({ type: GET_SURVEYED_STREETLIGHTS, payload: surveyed_poles });
    dispatch({ type: GET_INSTALLED_STREETLIGHTS, payload: installed_poles });
  } catch (error) {
    console.error(error);
  }
};

export const getViewPoles = (vendor_id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/pole-details/vendor/${vendor_id}`
    );
    const { data } = response;
    ``;
    const { installed_poles, surveyed_poles } = data;
    dispatch({ type: GET_VIEW_STREETLIGHTS, payload: surveyed_poles });
    // dispatch({ type: GET_INSTALLED_STREETLIGHTS, payload: installed_poles });
  } catch (error) {
    console.error(error);
  }
};

export const download = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/export-poles/vendor/${id}`);
    const { status } = response;
    if (status === 200) {
      alert("Downloaded successfully");
    } else {
      console.error("Failed to download");
    }
  } catch (error) {
    console.error("Error downloading data:", error);
  }
};
