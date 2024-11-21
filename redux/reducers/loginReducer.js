import { LOGIN_VENDOR_SUCCESS, LOGIN_VENDOR_FAILURE, LOGOUT } from "../constant";

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null
};

export const loginReducer = (state = initialState, action) => {
  console.log('Login reducer called with action:', action.type);
  switch (action.type) {
    case LOGIN_VENDOR_SUCCESS:
      console.log('LOGIN_VENDOR_SUCCESS:', action.payload);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null
      };
    case LOGIN_VENDOR_FAILURE:
      console.log('LOGIN_VENDOR_FAILURE:', action.payload);
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };
    case LOGOUT:
      console.log('LOGOUT');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null
      };
    default:
      return state;
  }
};