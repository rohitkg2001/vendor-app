import {
  VIEW_INVENTORY,
  UPDATE_INVENTORY,
  COUNT_INVENTORY,
  GET_ALL_INVENTORY,
} from "../constant";

const initialState = {
  inventory: [],
  currentItem: null,
};

export const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_INVENTORY:
      return { ...state, inventory: action.payload };
    case VIEW_INVENTORY:
      return { ...state, currentItem: action.payload,  };

    case UPDATE_INVENTORY:
      return { ...state, inventory: action.payload };
    case COUNT_INVENTORY:
      return {
        ...state,
        count: state.inventory.length,
      };
    default:
      return state;
  }
};
