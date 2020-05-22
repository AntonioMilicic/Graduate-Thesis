import Home from "../components/home.vue";
import Products from "../components/products/productsContainer.vue";
import ProductDetail from "../components/products/productDetails.vue";
import Profile from "../components/profile/userProfile.vue";
import SignIn from "../components/authentication/signIn.vue";
import CreateAndUpdateAccount from "../components/authentication/createAndUpdateAccount.vue";
import Cart from "../components/cart/cartContainer.vue";
import Checkout from "../components/cart/checkout.vue";

export const routes = [
  { path: "/", component: Home },
  { path: "/Products", component: Products },
  { path: "/Products/Product-:id", component: ProductDetail },
  { path: "/Profile/:id", component: Profile },
  { path: "/Profile/:id/Update-Profile", component: CreateAndUpdateAccount },
  // { path: "/Profile/:id/Create-Product", component: CreateProduct },
  { path: "/Cart", component: Cart },
  { path: "/Cart/Checkout/", component: Checkout },
  { path: "/SignIn", component: SignIn },
  { path: "/CreateAccount", component: CreateAndUpdateAccount },
];
