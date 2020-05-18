import Vue from "vue";
import Vuex from "vuex";
// import createPersistedState from "vuex-persistedstate";

import products from "./modules/products/products";
import account from "./modules/account/account";

Vue.use(Vuex);

export default new Vuex.Store({
  // plugins: [createPersistedState()],
  modules: {
    products,
    account,
  },
});
