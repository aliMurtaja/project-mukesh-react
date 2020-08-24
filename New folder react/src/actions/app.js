import { SET_LOADING, RESET_LOADING } from "utils/constants";

/** APP ACTIONS */

// Set Loadinng with default values

export const setLoading = (
  payload = { text: "Loading...", status: true },
  context = "app"
) => {
  return {
    type: SET_LOADING,
    payload: {
      context,
      ...payload
    }
  };
};

// Reset Loading Based on context

export const resetLoading = context => {
  return {
    type: RESET_LOADING,
    payload: { context }
  };
};
