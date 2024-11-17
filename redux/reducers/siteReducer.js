import { initialState, VIEW_SITE, SEARCH_SITE } from "../constant";

export const siteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
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
