import Home from "../components/homepage/HomePage.vue";
import Products from "../components/products/ProductContainer.vue";
import ProductDetail from "../components/products/detail/ProductDetail.vue";
import Profile from "../components/profile/UserProfile.vue";
import CreateProduct from "../components/profile/createProduct/CreateProduct.vue";
import Cart from "../components/cart/CartContainer.vue";
import Checkout from "../components/cart/checkout/CartCheckout.vue";
import SignIn from "../components/authentication/UserSignIn.vue";
import CreateAndUpdateAccount from "../components/authentication/Create&UpdateCredentials.vue";

export const routes = [
  { path: "/", component: Home },
  { path: "/Products", component: Products },
  { path: "*/Products/Product-:id", component: ProductDetail },
  { path: "/Profile/:id", component: Profile },
  { path: "/Profile/:id/Create-Product", component: CreateProduct },
  { path: "/Profile/:id/Update-Profile", component: CreateAndUpdateAccount },
  { path: "/Cart", component: Cart },
  { path: "/Cart/Checkout/", component: Checkout },
  { path: "/SignIn", component: SignIn },
  { path: "/CreateAccount", component: CreateAndUpdateAccount },
];
