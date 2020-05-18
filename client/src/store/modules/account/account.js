import * as mutations from "./mutations";
import * as actions from "./actions";
import * as getters from "./getters";

const state = {
  credentials: {
    email: "",
    password: "",
    adress: "",
    adress2: "",
    city: "",
    country: "",
    zip: "",
  },
  login: {},
};

export default {
  state,
  mutations,
  actions,
  getters,
};
