import { VIEW_SITE, SEARCH_SITE } from "../constant";

export const viewSite = (siteId) => async (dispatch, getState) => {
  const { sites } = getState();
  const site = sites.find((site) => site.id === siteId);

  if (site) {
    await dispatch({ type: VIEW_SITE, payload: site });
    return true;
  } else {
    console.error("Site not found");
    return false;
  }
};

export const searchSite = (searchQuery) => async (dispatch, getState) => {
  const { sites } = getState();
  const searchResults = sites.filter((site) =>
    site.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  await dispatch({ type: SEARCH_SITE, payload: searchResults });
  return searchResults;
};
