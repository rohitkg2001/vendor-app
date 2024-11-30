import {
  initialState,
  VIEW_PROJECT,
  SEARCH_PROJECT,
  UPDATE_PROJECT,
  COUNT_PROJECTS,
  CHANGE_PROJECT_STATUS,
} from "../constant";

export const projectReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case VIEW_PROJECT:
      return { ...state, currentProject: payload };
      

    case SEARCH_PROJECT:
      return {
        ...state,
        searchResults: state.projects.filter((project) =>
          project.name.toLowerCase().includes(payload.toLowerCase())
        ),
      };

    case UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === payload.id ? { ...project, ...payload } : project
        ),
      };

    case COUNT_PROJECTS:
      return {
        ...state,
        projectCount: state.projects.length,
      };

    case CHANGE_PROJECT_STATUS:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === payload.id
            ? { ...project, status: payload.status }
            : project
        ),
      };

    default:
      return state;
  }
};