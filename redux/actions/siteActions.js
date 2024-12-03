import { VIEW_SITE, SEARCH_SITE, BASE_URL, GET_ALL_SITES } from "../constant";

export const getAllSites = () => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_URL}/api/sites`)
    const data = await response.json()
    console.log(data)
    dispatch({ type: GET_ALL_SITES, payload: data })
  } catch (error) {
    console.log(error)
  }
}
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
