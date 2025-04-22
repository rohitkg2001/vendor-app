import {
  VIEW_SITE,
  SEARCH_SITE,
  GET_ALL_SITES,
  BASE_URL,
  SET_SITES_COUNT,
  SET_SITE_INFO,
  START_INSTALLATION,
} from "../constant";
import axios from "axios";

export const fetchSites = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/vendors/${id}/sites`);
    const { data, status } = response;
    const { sites } = data;

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

export const setSiteInfo = (val) => async (dispatch) => {
  dispatch({ type: SET_SITE_INFO, payload: val });
};

export const startInstallation = (val) => async (dispatch) => {
  dispatch({ type: START_INSTALLATION, payload: val });
};
