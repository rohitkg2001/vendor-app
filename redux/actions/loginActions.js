import { LOGIN_VENDOR_SUCCESS, LOGIN_VENDOR_FAILURE, LOGOUT } from "../constant";

export const login = (username, password) => async (dispatch) => {
  try {
    // Here you would typically make an API call to authenticate the user
    // For this example, we'll use a mock authentication
    if (username === "user@example.com" && password === "password123") {
      dispatch({ type: LOGIN_VENDOR_SUCCESS, payload: { username } });
      return true; // Indicate successful login
    } else {
      dispatch({ type: LOGIN_VENDOR_FAILURE, payload: "Invalid credentials" });
      return false; // Indicate failed login
    }
  } catch (error) {
    dispatch({ type: LOGIN_VENDOR_FAILURE, payload: error.message });
    return false; // Indicate failed login
  }
};

export const logout = () => ({
  type: LOGOUT
});