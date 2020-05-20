export const SUBMIT_USER = (state, payload) => {
  state.userData = payload;
};

export const CLEAR_ACCOUNT_STATE = (state) => {
  state.userData = [];
};
