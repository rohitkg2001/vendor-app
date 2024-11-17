import {
  VIEW_PROJECT,
  SEARCH_PROJECT,
  UPDATE_PROJECT,
  COUNT_PROJECTS,
  CHANGE_PROJECT_STATUS,
} from "../constant";

export const viewProject = (projectId) => async (dispatch, getState) => {
  const { projects } = getState();
  const project = projects.find((project) => project.id === projectId);

  if (project) {
    await dispatch({ type: VIEW_PROJECT, payload: project });
    return true;
  } else {
    console.error("Project not found");
    return false;
  }
};

export const searchProject = (searchQuery) => async (dispatch, getState) => {
  const { projects } = getState();
  const searchResults = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  await dispatch({ type: SEARCH_PROJECT, payload: searchResults });
  return searchResults;
};

export const updateProject =
  (projectId, updatedProjectData) => async (dispatch, getState) => {
    const { projects } = getState();
    const projectIndex = projects.findIndex(
      (project) => project.id === projectId
    );

    if (projectIndex !== -1) {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex] = {
        ...updatedProjects[projectIndex],
        ...updatedProjectData,
      };

      await dispatch({ type: UPDATE_PROJECT, payload: updatedProjects });
      return true;
    } else {
      console.error("Project not found");
      return false;
    }
  };

export const countProjects = () => async (dispatch, getState) => {
  const { projects } = getState();
  const count = projects.length;

  await dispatch({ type: COUNT_PROJECTS, payload: count });
  return count;
};

export const changeProjectStatus =
  (projectId, status) => async (dispatch, getState) => {
    const { projects } = getState();
    const projectIndex = projects.findIndex(
      (project) => project.id === projectId
    );

    if (projectIndex !== -1) {
      const updatedProjects = [...projects];
      updatedProjects[projectIndex] = {
        ...updatedProjects[projectIndex],
        status,
      };

      await dispatch({ type: CHANGE_PROJECT_STATUS, payload: updatedProjects });
      return true;
    } else {
      console.error("Project not found");
      return false;
    }
  };
