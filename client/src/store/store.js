import Vue from "vue";
import Vuex from "vuex";

import products from "./modules/products/products";
import account from "./modules/users/users";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    products,
    account,
  },
});
