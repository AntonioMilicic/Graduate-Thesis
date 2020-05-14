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
    const reduceStoreQuantity = state.products.find(
      (element) => element.id === productId
    );
    reduceStoreQuantity.quantity -= quantitySelected;
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
    const itemCart = state.cart.find((element) => element.id === id);
    const itemStore = state.products.find((element) => element.id === id);
    itemStore.quantity += itemCart.quantitySelected;
    state.cart.splice(state.cart.indexOf(itemCart), 1);
  },
  CLEAR_CART(state) {
    state.cart.forEach((element) => {
      const alterProduct = state.products.find(
        (product) => product.id === element.id
      );
      alterProduct.quantity += element.quantitySelected;
    });
    state.cart = [];
  },
  ALTER_CART_QUANTITY(state, order) {
    const item = state.cart.find((element) => element.id === order.id);
    const itemStore = state.products.find((element) => element.id === order.id);
    if (order.operation === "+") {
      item.quantitySelected++;
      itemStore.quantity--;
    } else if (order.operation === "-") {
      item.quantitySelected--;
      itemStore.quantity++;
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
    const availableProducts = state.products.filter(
      (element) => element.quantity > 0
    );
    return availableProducts;
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
