import {
  VIEW_INVENTORY,
  UPDATE_INVENTORY,
  COUNT_INVENTORY,
  BASE_URL,
  GET_ALL_INVENTORY,
} from "../constant";

export const viewInventory = (item) => ({
  type: VIEW_INVENTORY,
  payload: item,
});

export const getAllItems = () => async (dispatch) => {
  try {
    // const response = await fetch(`${BASE_URL}/api/inventories`);
    const response = await fetch(
      `${BASE_URL}/api/get-inventory/vendor/${vendorId}`
    );
    const data = await response.json();
    dispatch({ type: GET_ALL_INVENTORY, payload: data });
  } catch (err) {}
};

export const updateInventory = (item) => ({
  type: UPDATE_INVENTORY,
  payload: item,
});

export const countInventory = () => ({
  type: COUNT_INVENTORY,
});
