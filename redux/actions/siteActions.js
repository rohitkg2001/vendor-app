import {
  VIEW_SITE,
  SEARCH_SITE,
  GET_ALL_SITES,
  BASE_URL,
  SET_SITES_COUNT,
} from "../constant";
import axios from "axios";


export const fetchSites = (id) => async (dispatch) => {
  try {
    console.log(id);
    const response = await axios.get(`${BASE_URL}/api/vendors/${id}/sites`);
    const { data, status } = response
    const { sites } = data;
    console.log(sites);
    dispatch({ type: GET_ALL_SITES, payload: sites });
    dispatch({ type: SET_SITES_COUNT, payload: sites.length });
  } catch (error) {
    console.error(`Error fetching sites: ${error.message}`);
  }
};

export const viewSite = (site) => ({
  type: VIEW_SITE,
  payload: site,
});

export const searchSite = (searchText) => ({
  type: SEARCH_SITE,
  payload: searchText,
});

