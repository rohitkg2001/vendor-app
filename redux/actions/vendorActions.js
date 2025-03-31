import { BASE_URL, LOGIN_VENDOR } from "../constant";
import moment from "moment";
import { vendor } from "../../utils/faker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Platform } from "react-native";

export const greet = () => {
  // Write a logic to get morning, afternoon, evening and night as per time from moment
  const currentTime = moment().format("HH");

  if (0 < currentTime && currentTime < 12) {
    return "Good Morning";
  } else if (12 < currentTime && currentTime < 16) {
    return "Good Afternoon";
  } else if (16 < currentTime && currentTime < 21) {
    return "Good Evening";
  } else {
    return "Come Tomorrow";
  }
};

export const login = (user, pass) => async (dispatch) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/login`, {
      email: user,
      password: pass
    });

    const { data, status } = response
    if (status === 200) {
      if (data.user.role !== 3) {
        alert("You are not authorised to use this app");
        return false;
      }
      dispatch({ type: LOGIN_VENDOR, payload: data.user });
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const changePassword = (old_pass, new_pass) => async (dispatch) => {
  if (old_pass === "1234" && new_pass !== "") {
    const updatedPassword = new_pass;
    await dispatch({ type: CHANGE_PASSWORD, payload: updatedPassword });
    return true;
  } else {
    return false;
  }
};

export const viewProfile = (userId) => async (dispatch) => {
  if (userId === 1) {
    const profileData = {
      userId: 1,
      userName: "rakesh.sharma",
      email: "rakesh.sharma@example.com",
      contactNo: "9634762365",
    };
    await dispatch({ type: VIEW_PROFILE, payload: profileData });
    return true;
  } else {
    console.error("User not found");
    return false;
  }
};

export const logOut = async () => {
  await AsyncStorage.setItem("userId", null);
  await AsyncStorage.setItem("sessionId", null);
};

// export const updatePicture = async (id, file) => {
//   try {
//     const formData = new FormData();
//     if (file) {
//       // const { uri, name, mimeType } = file;
//       formData.append("image", {
//         uri: file.uri,
//         type: "image",
//         name: "image.jpg",
//       });
//     }
//     console.log(id, file, "this line is working");
//     const response = await axios.post(
//       `${BASE_URL}/api/vendor/upload-avatar/${id}`,
//       formData
//       // {
//       //   headers: {
//       //     "Content-Type": "multipart/form-data", // Ensure proper headers
//       //   },
//       // }
//     );
//     const { data, status } = response;
//     // const data = await response.json();
//     // const { data, status } = response;
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//     //return handleAxiosError(err);
//   }
// };

// export const updatePicture = async (id, file) => {
//   try {
//     if (!file || !file.uri) {
//       throw new Error("Invalid file selected");
//     }

//     const formData = new FormData();
//     formData.append("image", {
//       uri: file.uri,
//       type: "image/jpeg",
//       name: `avatar_${id}.jpg`, // Ensure name is included
//     });

//     const response = await axios.post(
//       `${BASE_URL}/api/vendor/upload-avatar/${id}`,
//       formData,
//       {
//         headers: {
//           Accept: "application/json", // Optional
//         },
//       }
//     );

//     const { data } = response;
//     console.log(data);
//     return data;
//   } catch (err) {
//     console.error("Upload Error:", err);
//     return handleAxiosError(err);
//   }
// };

export const updatePicture = async (id, file) => {
  try {
    if (!file || !file.uri) {
      throw new Error("Invalid file selected");
    }

    // Normalize URI for Android/iOS
    const imageUri =
      Platform.OS === "ios" ? file.uri.replace("file://", "") : file.uri;

    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      type: "image/jpeg",
      name: `avatar_${id}.jpg`,
    });

    const response = await axios.post(
      `${BASE_URL}/api/vendor/upload-avatar/${id}`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      }
    );

    const { data } = response;
    console.log("Upload Successful:", data);
    return data;
  } catch (err) {
    if (err.response) {
      console.error("Server Error:", err.response.data);
    } else if (err.request) {
      console.error("No Response from Server:", err.request);
    } else {
      console.error("Upload Error:", err.message);
    }
    return handleAxiosError(err);
  }
};
