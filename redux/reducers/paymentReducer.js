import {
  initialState,
  VIEW_PAYMENT,
  SEARCH_PAYMENT,
  UPDATE_PAYMENT,
  DELETE_PAYMENT,
  COUNT_PAYMENTS,
} from "../constant";

export const paymentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case VIEW_PAYMENT:
      return { ...state, currentPayment: payload };

    case SEARCH_PAYMENT:
      return {
        ...state,
        searchResults: state.payments.filter((payment) =>
          payment.reference.toLowerCase().includes(payload.toLowerCase())
        ),
      };

    case UPDATE_PAYMENT:
      return {
        ...state,
        payments: state.payments.map((payment) =>
          payment.id === payload.id ? { ...payment, ...payload } : payment
        ),
      };

    case DELETE_PAYMENT:
      return {
        ...state,
        payments: state.payments.filter((payment) => payment.id !== payload.id),
      };

    case COUNT_PAYMENTS:
      return {
        ...state,
        paymentCount: state.payments.length,
      };

    default:
      return state;
  }
};
