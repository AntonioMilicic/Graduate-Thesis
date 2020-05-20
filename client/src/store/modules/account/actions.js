export const submitUser_Store = ({ commit }, payload) => {
  commit("SUBMIT_USER", payload);
};

export const clearAccountSate_Store = ({ commit }) => {
  commit("CLEAR_ACCOUNT_STATE");
};
