import Home from "../components/homepage/HomePage.vue";
import Products from "../components/products/ProductContainer.vue";
import ProductDetail from "../components/products/detail/ProductDetail.vue";
import Profile from "../components/profile/UserProfile.vue";
import CreateAndUpdateProduct from "../components/products/create&updateProduct/Create&UpdateProduct.vue";
import Cart from "../components/cart/CartContainer.vue";
import Checkout from "../components/cart/checkout/CartCheckout.vue";
import SignIn from "../components/authentication/UserSignIn.vue";
import CreateAndUpdateAccount from "../components/authentication/Create&UpdateCredentials.vue";

import UserProducts from "../components/profile/UserProfileProducts.vue"
import UserOrders from "../components/profile/UserProfileOrders.vue"

export const routes = [
  { path: "/", component: Home },
  { path: "/Products", component: Products },
  { path: "*/Products/Product-:id", component: ProductDetail },
  {
    path: "/Profile/:username", component: Profile,
    children: [{
      path: "User-Products",
      component: UserProducts
    }, {
      path: "User-Orders",
      component: UserOrders
    }]
  },
  { path: "/Profile/:username/Create-Product", component: CreateAndUpdateProduct },
  { path: "/Profile/:username/Update-Product-:id", component: CreateAndUpdateProduct },
  { path: "/Profile/:username/Update-Profile", component: CreateAndUpdateAccount },
  { path: "/Cart", component: Cart },
  { path: "/Cart/Checkout/", component: Checkout },
  { path: "/SignIn", component: SignIn },
  { path: "/CreateAccount", component: CreateAndUpdateAccount },
];
