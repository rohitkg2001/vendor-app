// A reducer file that will handle all data interaction specific to the vendor
// login,logout, change_password, view_profile etc
import {
  initialState,
  LOGIN_VENDOR,
  LOGIN_VENDOR_CHANGE_PASSWORD,
  LOGIN_VENDOR_VIEW_PROFILE,
} from "../constant";

export const vendorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_VENDOR:
      return { ...state, ...payload };
    case LOGIN_VENDOR_CHANGE_PASSWORD:
      return { ...state, ...payload };
    case LOGIN_VENDOR_VIEW_PROFILE:
      return { ...state, ...payload };

    default:
      return state;
  }
};