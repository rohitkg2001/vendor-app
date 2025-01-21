import {
  initialState,
  VIEW_PROJECT,
  UPDATE_PROJECT,
  COUNT_PROJECTS,
  GET_ALL_PROJECTS,
} from "../constant";

export const projectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_PROJECTS:
      return { ...state, projects: payload };
    case VIEW_PROJECT:
      return { ...state, currentProject: payload };

    case UPDATE_PROJECT:
      return { ...state, projects: action.payload };

    case COUNT_PROJECTS:
      return {
        ...state,
        projectCount: state.projects.length,
      };

    default:
      return state;
  }
};
