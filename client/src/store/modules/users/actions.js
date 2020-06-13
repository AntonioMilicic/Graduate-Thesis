export const submitUser_Store = ({ commit }, payload) => {
  commit("SUBMIT_USER", payload);
};

export const clearUserState_Store = ({ commit }) => {
  commit("CLEAR_USER_STATE");
};
