import { VIEW_SITE, GET_ALL_SITES, SET_SITE_INFO } from "../constant";

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
    case SET_SITE_INFO:
      return { ...state, siteInfo: action.payload };
    default:
      return state;
  }
};
