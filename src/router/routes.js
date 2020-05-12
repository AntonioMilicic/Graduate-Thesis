import Home from "../components/home.vue";
import Products from "../components/products/productsContainer.vue";
import ProductDetail from "../components/products/productDetails.vue";
import Profile from "../components/profile/userProfile.vue";
import Login from "../components/authentication/login.vue";
import CreateAccout from "../components/authentication/createAccout.vue";
import Cart from "../components/cart/cartContainer.vue";
import Checkout from "../components/cart/checkout.vue";

export const routes = [
  { path: "/", component: Home },
  { path: "/Products", component: Products },
  { path: "/Products/:id", component: ProductDetail },
  { path: "/Profile", component: Profile },
  { path: "/Cart", component: Cart },
  { path: "/Cart/Checkout", component: Checkout },
  { path: "/Login", component: Login },
  { path: "/CreateAccount", component: CreateAccout },
];
