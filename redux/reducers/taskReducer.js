import {
  UPDATE_TASK,
  VIEW_TASK,
  GET_ALL_TASKS,
  TOTAL_PENDING_STREETLIGHT,
  GET_PENDING_STREETLIGHTS,
  GET_SURVEYED_STREETLIGHTS,
  TOTAL_SURVEYED_STREETLIGHTS,
  GET_INSTALLED_STREETLIGHTS,
  TOTAL_INSTALLED_STREETLIGHTS,
  SET_POLE_NUMBER,
  SET_BENEFICIARY_NAME,
  SET_BENEFICIARY_CONTACT,
  SET_LOCATION_REMARKS,
} from "../constant";

const initialState = {
  tasks: [],
  currentTask: null,
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      return { ...state, tasks: action.payload };
    case UPDATE_TASK:
      return { ...state, currentTask: action.payload };
    case VIEW_TASK:
      return {
        ...state,
        currentTask: action.payload,
      };
    case TOTAL_PENDING_STREETLIGHT:
      return { ...state, pendingStreetLightCounts: action.payload };
    case GET_PENDING_STREETLIGHTS:
      return { ...state, pendingStreetLights: action.payload };
    case GET_SURVEYED_STREETLIGHTS:
      return { ...state, surveyedStreetLights: action.payload };
    case TOTAL_SURVEYED_STREETLIGHTS:
      return { ...state, surveyedStreetLightCounts: action.payload };
    case GET_INSTALLED_STREETLIGHTS:
      return { ...state, installedStreetLights: action.payload };
    case TOTAL_INSTALLED_STREETLIGHTS:
      return { ...state, installedStreetLightCounts: action.payload };
    case SET_POLE_NUMBER:
      return { ...state, pole_number: action.payload };
    case SET_BENEFICIARY_NAME:
      return { ...state, beneficiaryName: action.payload };
    case SET_BENEFICIARY_CONTACT:
      return { ...state, contactNumber: action.payload };
    case SET_LOCATION_REMARKS:
      return { ...state, locationRemarks: action.payload };
    default:
      return state;
  }
};
