import * as mutations from "./mutations";
import * as actions from "./actions";
import * as getters from "./getters";

const state = {
  products: [],
  cart: [],
  totalPrice: 0,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
