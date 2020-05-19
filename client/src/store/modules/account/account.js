import * as mutations from "./mutations";
import * as actions from "./actions";
import * as getters from "./getters";

const state = {
  userData: {
    first_name: "",
    last_name: "",
    username: "",
    role: "",
    email: "",
    password: "",
    country: "",
    city: "",
    address: "",
    house_number: "",
    zip: "",
    image: "",
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
