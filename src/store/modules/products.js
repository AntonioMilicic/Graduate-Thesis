import products from "../../data/productData";

const state = {
  products: [],
  cart: [],
  totalPrice: 0,
};

const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  ADD_TO_CART(state, { productId, quantitySelected, price }) {
    const previousData = state.cart.find((element) => element.id === productId);
    if (previousData) {
      previousData.quantitySelected += quantitySelected;
    } else {
      state.cart.push({
        id: productId,
        quantitySelected,
      });
    }
    state.totalPrice += price * quantitySelected;
  },
  REMOVE_FROM_CART(state, id) {
    const item = state.cart.find((element) => element.id === id);
    state.cart.splice(state.cart.indexOf(item), 1);
  },
  CLEAR_CART(state) {
    state.cart = [];
  },
  ALTER_CART_QUANTITY(state, order) {
    const item = state.cart.find((element) => element.id === order.id);
    if (order.operation === "+") {
      item.quantitySelected++;
    } else if (order.operation === "-") {
      item.quantitySelected--;
    } else {
      console.log("Error, unknown operation");
    }
  },
};

const actions = {
  initProducts: ({ commit }) => {
    commit("SET_PRODUCTS", products);
  },
  addToCart_Store: ({ commit }, orderInfo) => {
    commit("ADD_TO_CART", orderInfo);
  },
  removeFromCart_Store: ({ commit }, id) => {
    commit("REMOVE_FROM_CART", id);
  },
  clearCart_Store: ({ commit }) => {
    commit("CLEAR_CART");
  },
  quantityAlter_Store: ({ commit }, order) => {
    const item = state.cart.find((element) => element.id === order.id);
    const product = state.products.find((element) => element.id === order.id);
    if (order.operation === "+" && item.quantitySelected === product.quantity) {
      window.alert(
        "You have reached our stock limit, we will look into it and order more products if possible :)"
      );
    } else if (order.operation === "-" && item.quantitySelected === 1) {
      const result = window.confirm(
        "Clicking 'OK' will remove product from cart\nDo you want to remove it? :)"
      );
      if (result) {
        commit("REMOVE_FROM_CART", order.id);
      }
    } else {
      commit("ALTER_CART_QUANTITY", order);
    }
  },
};

const getters = {
  products: (state) => {
    return state.products;
  },
  productDetail: (state) => (id) => {
    return state.products.find((element) => element.id === id);
  },
  selectedProducts: (state) => {
    return state.cart.map((product) => {
      const selected = state.products.find(
        (element) => element.id === product.id
      );
      return {
        ...selected,
        selectedQuantity: product.quantitySelected,
      };
    });
  },
  categories: (state) => {
    let categoryList = [];
    state.products.forEach((element) => {
      categoryList.push(element.category);
    });
    categoryList = categoryList.sort();
    return [...new Set(categoryList)];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
