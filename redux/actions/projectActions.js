import {
  VIEW_PROJECT,
  SEARCH_PROJECT,
  UPDATE_PROJECT,
  COUNT_PROJECTS,
  CHANGE_PROJECT_STATUS,
} from "../constant";
import { orders, projects, sites } from "../../utils/faker";

export const filterProjects = (status) => {
  return projects.filter((project) => project.status === status)
}
export const ongoingProjects = filterProjects(0)
export const completedProjects = filterProjects(1)
export const holdProjects = filterProjects(2)
export const rejectedProjects = filterProjects(3)
export const cancelledProjects = filterProjects(4)
export const projectCounts = [
  {
    title: 'Ongoing',
    count: ongoingProjects.length,
    data: ongoingProjects,
    page: 'projectsScreen'
  },
  {
    title: 'Completed',
    count: completedProjects.length,
    data: completedProjects,
    page: 'projectsScreen'
  },
  {
    title: 'Hold',
    count: holdProjects.length,
    data: holdProjects,
    page: 'projectsScreen'
  },
  {
    title: 'Rejected',
    count: rejectedProjects.length,
    data: rejectedProjects,
    page: 'projectsScreen'
  }
]
// TODO:Add more status codes as per client requirement

export const statCards = [
  {
    id: "1",
    title: 'Total Projects',
    count: projects.length,
    page: 'projectsScreen',
    backgroundColor: "#A0D3E8"
  },
  {
    id: "2",
    title: "Total Earning",
    count: 0,
    page: "totalEarningScreen",
    backgroundColor: "#C8E6C9",
  },
  {
    id: "3",
    title: "Total Sites",
    count: sites.length,
    page: "requirementsScreen",
    backgroundColor: "#E1BEE7",
  },
  {
    id: "4",
    title: "Inventory",
    count: orders.length,
    page: "orderScreen",
    backgroundColor: "#FFF9C4"

  }
]

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
