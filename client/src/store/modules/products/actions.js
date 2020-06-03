import { getProducts } from "./server_comm/serverController";
// uzrokuje problem?
export const initProducts = async ({ commit }) => {
  const products = await getProducts();
  commit("SET_PRODUCTS", products);
};

export const addToCart_Store = ({ commit }, payload) => {
  commit("ADD_TO_CART", payload);
};

export const removeFromCart_Store = ({ commit }, id) => {
  commit("REMOVE_FROM_CART", id);
};

export const clearCart_Store = ({ commit }) => {
  commit("CLEAR_CART");
};

export const quantityAlter_Store = ({ commit, state }, payload) => {
  const item = state.cart.find((element) => element.id === payload.id);
  const product = state.products.find((element) => element.id === payload.id);

  if (payload.operation === "+" && product.quantity === 0) {
    window.alert(
      "You have reached our stock limit, we will look into it and order more products if possible :)"
    );
  } else if (payload.operation === "-" && item.quantitySelected === 1) {
    const result = window.confirm(
      "Clicking 'OK' will remove product from cart\nDo you want to remove it? :)"
    );
    if (result) {
      commit("REMOVE_FROM_CART", payload.id);
    }
  } else {
    commit("ALTER_CART_QUANTITY", payload);
  }
};
