import { initialState, VIEW_SITE, SEARCH_SITE, GET_ALL_SITES } from "../constant";

export const siteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_SITES:
      return { ...state, sites: payload };

    case VIEW_SITE:
      return { ...state, currentSite: payload };

    case SEARCH_SITE:
      return {
        ...state,
        searchResults: state.sites.filter((site) =>
          site.name.toLowerCase().includes(payload.toLowerCase())
        ),
      };

    default:
      return state;
  }
};
