import Vue from "vue";
import App from "./App";
import VueRouter from "vue-router";
import axios from "axios";

import { routes } from "./router/routes";
import store from "./store/store";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingCart,
  faTimesCircle,
  faSignInAlt,
  faUserTie,
  faFemale,
  faMale,
  faIdCardAlt,
  faArchive,
  faHome,
  faLock,
  faUserShield,
  faCreditCard,
  faTrash,
  faList,
  faSearch,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faShoppingCart,
  faTimesCircle,
  faSignInAlt,
  faUserTie,
  faFemale,
  faMale,
  faIdCardAlt,
  faArchive,
  faHome,
  faLock,
  faUserShield,
  faCreditCard,
  faTrash,
  faList,
  faSearch,
  faAngleDoubleUp
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.filter("currency", (value) => {
  return "$" + value.toLocaleString();
});

axios.defaults.baseURL = "http://localhost:5000/api";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes,
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  render: (h) => h(App),
});
