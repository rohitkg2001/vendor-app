import { VIEW_SITE, SEARCH_SITE, ADD_SITE, GET_ALL_SITES, SET_SITES_COUNT } from "../constant";

const initialState = {
  sites: [],
  filteredSites: [],
  currentSite: null,
  searchText: "",
  projectCount: 0,
};

export const siteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SITES:
      return {
        ...state,
        sites: action.payload,
      };
    case SET_SITES_COUNT:
      return {
        ...state,
        sitesCount: action.payload,
      };
    case ADD_SITE:
      return {
        ...state,
        sites: action.payload,
      };

    case VIEW_SITE:
      return {
        ...state,
        currentSite: action.payload,
      };
    case SEARCH_SITE:
      return {
        ...state,
        sites: action.payload
      };
    default:
      return state;
  }
};
