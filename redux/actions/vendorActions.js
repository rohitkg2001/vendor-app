import {
  LOGIN_VENDOR,
  CHANGE_PASSWORD,
  VIEW_PROFILE,
  LOGOUT,
} from "../constant";

export const login = (user, pass) => async (dispatch) => {
  console.log(user, pass);
  if (user === "abc" && pass === "123") {
    const user = {
      userId: 1,
      userName: "rakesh.sharma",
      password: "1234",
      sessionId: "ABC123",
    };
    await dispatch({ type: LOGIN_VENDOR, payload: user });
    return true;
  } else {
    return false;
  }
  // TODO:Write api call for login
};

export const changePassword = (old_pass, new_pass) => async (dispatch) => {
  console.log("Changing password", old_pass, new_pass);

  if (old_pass === "1234" && new_pass !== "") {
    const updatedPassword = new_pass;
    console.log("Password changed successfully to:", updatedPassword);

    await dispatch({ type: CHANGE_PASSWORD, payload: updatedPassword });
    return true;
  } else {
    console.error("Invalid old password or new password is empty");
    return false;
  }
};

export const viewProfile = (userId) => async (dispatch) => {
  console.log("Viewing profile for user ID:", userId);

  if (userId === 1) {
    const profileData = {
      userId: 1,
      userName: "rakesh.sharma",
      email: "rakesh.sharma@example.com",
      phone: "9634762365",
    };

    console.log("Profile data:", profileData);
    await dispatch({ type: VIEW_PROFILE, payload: profileData });
    return true;
  } else {
    console.error("User not found");
    return false;
  }
};

export const logOut = (userId, sessionId) => async (dispatch) => {
  console.log("Logging out user ID:", userId, "with session ID:", sessionId);

  if (userId === 1 && sessionId === "ABC123") {
    await dispatch({ type: LOGOUT, payload: { userId, sessionId } });
    console.log("User logged out successfully");
    return true;
  } else {
    console.error("Invalid user or session ID");
    return false;
  }
};
