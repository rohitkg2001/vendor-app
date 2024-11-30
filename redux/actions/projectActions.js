import {
  VIEW_PROJECT,
  SEARCH_PROJECT,
  UPDATE_PROJECT,
  COUNT_PROJECTS,
  CHANGE_PROJECT_STATUS,
} from "../constant";
import { inventory, projects, sites } from "../../utils/faker";

export const filterByStatus = (arr, status) => {
  return arr.filter((item) => item.status === status);
};

export const ongoingProjects = filterByStatus(projects, 0);
export const completedProjects = filterByStatus(projects, 1);
export const holdProjects = filterByStatus(projects, 2);
export const rejectedProjects = filterByStatus(projects, 3);
export const cancelledProjects = filterByStatus(projects, 4);

export const projectCounts = [
  {
    title: "ongoing",
    count: ongoingProjects.length,
    data: ongoingProjects,
    page: "projectsScreen",
  },
  {
    title: "Completed",
    count: completedProjects.length,
    data: completedProjects,
    page: "projectsScreen",
  },
  {
    title: "hold",
    count: holdProjects.length,
    data: holdProjects,
    page: "projectsScreen",
  },
  {
    title: "rejected",
    count: rejectedProjects.length,
    data: rejectedProjects,
    page: "projectsScreen",
  },
];

export const statCards = [
  {
    id: "1",
    title: "total_projects",
    count: projects.length,
    page: "projectsScreen",
    backgroundColor: "#A0D3E8",
  },
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
    count: sites.length,
    page: "siteScreen",
    backgroundColor: "#E1BEE7",
  },
  {
    id: "4",
    title: "inventory_title",
    count: inventory.length,
    page: "inventoryScreen",
    backgroundColor: "#FFF9C4",
  },
];

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
