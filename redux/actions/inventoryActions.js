import {
  VIEW_INVENTORY,
  UPDATE_INVENTORY,
  COUNT_INVENTORY,
  BASE_URL,
  GET_ALL_INVENTORY,
  SET_TOTAL_INVENTORY_VALUE,
  GET_TODAY_INVENTORY,
  GET_TOTAL_RECEIVED_INVENTORY,
  SET_IN_STOCK,
  SET_CONSUMED,
} from "../constant";

export const viewInventory = (item) => ({
  type: VIEW_INVENTORY,
  payload: item,
});

export const getAllItems = (vendorId) => async (dispatch) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/get-inventory/vendor/${vendorId}`
    );
    const data = await response.json();

    const {
      today_inventory,
      all_inventory,
      total_inventory_value,
      in_stock,
      consumed,
    } = data;

    dispatch({
      type: SET_TOTAL_INVENTORY_VALUE,
      payload: total_inventory_value,
    });

    dispatch({
      type: GET_ALL_INVENTORY,
      payload: all_inventory,
    });

    dispatch({
      type: GET_TODAY_INVENTORY,
      payload: today_inventory,
    });

    dispatch({
      type: GET_TOTAL_RECEIVED_INVENTORY,
      payload: all_inventory?.total_received, // Pass only the total_received array
    } );
        dispatch({
          type: SET_IN_STOCK,
          payload: in_stock, // assuming in_stock is part of the response data
        });
    dispatch({
      type: SET_CONSUMED,
      payload: consumed, // assuming consumed is part of the response data
    });


  } catch (err) {
    alert(err.message);
  }
};

export const updateInventory = (item) => ({
  type: UPDATE_INVENTORY,
  payload: item,
});

export const countInventory = () => ({
  type: COUNT_INVENTORY,
});