export const SUBMIT_USER = (state, payload) => {
  state.userData = payload;
};

export const CLEAR_USER_STATE = (state) => {
  state.userData = [];
};
