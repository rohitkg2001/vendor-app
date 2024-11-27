import { LOGIN_VENDOR } from "../constant";
import moment from "moment";
import { vendor } from "../../utils/faker";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  if (user === vendor.email && pass === vendor.password) {
    await dispatch({ type: LOGIN_VENDOR, payload: vendor });
    return true;
  } else {
    return false;
  }
  // TODO:Write api call for login
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
      phone: "9634762365",
    };
    await dispatch({ type: VIEW_PROFILE, payload: profileData });
    return true;
  } else {
    console.error("User not found");
    return false;
  }
};

export const logOut = async () => {
  await AsyncStorage.setItem("userId", null)
  await AsyncStorage.setItem("sessionId", null)
};
