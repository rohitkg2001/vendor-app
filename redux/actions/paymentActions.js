import {
  VIEW_PAYMENT,
  SEARCH_PAYMENT,
  UPDATE_PAYMENT,
  DELETE_PAYMENT,
  COUNT_PAYMENTS,
} from "../constant";

export const viewPayment = (paymentId) => async (dispatch, getState) => {
  const { payments } = getState();
  const payment = payments.find((payment) => payment.id === paymentId);

  if (payment) {
    await dispatch({ type: VIEW_PAYMENT, payload: payment });
    return true;
  } else {
    console.error("Payment not found");
    return false;
  }
};

export const searchPayment = (searchQuery) => async (dispatch, getState) => {
  const { payments } = getState();
  const searchResults = payments.filter((payment) =>
    payment.reference.toLowerCase().includes(searchQuery.toLowerCase())
  );

  await dispatch({ type: SEARCH_PAYMENT, payload: searchResults });
  return searchResults;
};

export const updatePayment =
  (paymentId, updatedPaymentData) => async (dispatch, getState) => {
    const { payments } = getState();
    const paymentIndex = payments.findIndex(
      (payment) => payment.id === paymentId
    );

    if (paymentIndex !== -1) {
      const updatedPayments = [...payments];
      updatedPayments[paymentIndex] = {
        ...updatedPayments[paymentIndex],
        ...updatedPaymentData,
      };

      await dispatch({ type: UPDATE_PAYMENT, payload: updatedPayments });
      return true;
    } else {
      console.error("Payment not found");
      return false;
    }
  };

export const deletePayment = (paymentId) => async (dispatch, getState) => {
  const { payments } = getState();
  const paymentExists = payments.some((payment) => payment.id === paymentId);

  if (paymentExists) {
    await dispatch({ type: DELETE_PAYMENT, payload: { id: paymentId } });
    return true;
  } else {
    console.error("Payment not found");
    return false;
  }
};

export const countPayments = () => async (dispatch, getState) => {
  const { payments } = getState();
  const count = payments.length;

  await dispatch({ type: COUNT_PAYMENTS, payload: count });
  return count;
};
