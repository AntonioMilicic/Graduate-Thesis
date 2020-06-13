import * as mutations from "./mutations";
import * as actions from "./actions";
import * as getters from "./getters";

const state = {
  userData: {
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    role: "",
    email: "",
    country: "",
    city: "",
    address: "",
    houseNumber: "",
    zipCode: "",
    image: "",
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
