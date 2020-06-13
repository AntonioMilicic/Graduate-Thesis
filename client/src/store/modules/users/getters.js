export const userData = (state) => {
  return state.userData;
};

export const userName = (state) => {
  if (state.userData.username != "") return state.userData.username;
  else return;
};
