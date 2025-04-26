import { VIEW_SITE, GET_ALL_SITES, START_INSTALLATION } from "../constant";

const initialState = {
  sites: [],
  currentSite: null,
};

export const siteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SITES:
      return { ...state, sites: action.payload };

    case VIEW_SITE:
      return { ...state, currentSite: action.payload };
    case START_INSTALLATION:
      return { ...state, installationData: action.payload };
    default:
      return state;
  }
};
