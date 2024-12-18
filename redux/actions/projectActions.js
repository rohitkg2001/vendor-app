import {
  VIEW_PROJECT,
  SEARCH_PROJECT,
  COUNT_PROJECTS,
  CHANGE_PROJECT_STATUS,
  BASE_URL,
  GET_ALL_PROJECTS,
} from "../constant";

export const filterByStatus = (arr, status) => {
  return arr.filter((item) => item.status === status);
};

export const ongoingProjects = filterByStatus([], 0);
export const completedProjects = filterByStatus([], 1);
export const holdProjects = filterByStatus([], 2);
export const rejectedProjects = filterByStatus([], 3);
export const cancelledProjects = filterByStatus([], 4);

export const getAllProjects = () => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/api/projects`);
    const data = await response.json();
    dispatch({ type: GET_ALL_PROJECTS, payload: data });
  } catch (error) {}
};
export const projectCounts = [
  {
    title: "ongoing",
    count: ongoingProjects.length,
    data: ongoingProjects,
    page: "projectsScreen",
  },
  {
    title: "completed",
    count: completedProjects.length,
    data: completedProjects,
    page: "projectsScreen",
  },
];

export const statCards = [
  // {
  //   id: "1",
  //   title: "total_projects",
  //   count: 0,
  //   page: "projectsScreen",
  //   backgroundColor: "#A0D3E8",
  // },
  {
    id: "2",
    title: "total_earning",
    count: 0,
    page: "totalEarningScreen",
    backgroundColor: "#C8E6C9",
  },
  {
    id: "3",
    title: "total_sites",
    count: 0,
    page: "siteScreen",
    backgroundColor: "#E1BEE7",
  },
  {
    id: "4",
    title: "inventory_title",
    count: 0,
    page: "inventoryScreen",
    backgroundColor: "#FFF9C4",
  },
];

export const viewProject = (projectId) => async (dispatch) => {
  const response = await fetch(`${BASE_URL}/api/projects/${projectId}`);
  const data = await response.json();
  dispatch({ type: VIEW_PROJECT, payload: data });
};

export const searchProject = (searchQuery) => async (dispatch, getState) => {
  const { projects } = getState();
  const searchResults = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  await dispatch({ type: SEARCH_PROJECT, payload: searchResults });
  return searchResults;
};

export const updateProject = (projectId, updatedData) => async (dispatch) => {
  dispatch({ type: "UPDATE_PROJECT_REQUEST" });
  try {
    const response = await fetch(`API_URL_HERE/projects/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update project");
    }

    const data = await response.json();
    dispatch({
      type: "UPDATE_PROJECT_SUCCESS",
      payload: data, // the updated project
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_PROJECT_FAILURE",
      error: error.message,
    });
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
