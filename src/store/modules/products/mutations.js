export const SET_PRODUCTS = (state, products) => {
  state.products = products;
};

export const ADD_TO_CART = (state, { productId, quantitySelected, price }) => {
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
};

export const REMOVE_FROM_CART = (state, id) => {
  const itemCart = state.cart.find((element) => element.id === id);
  const itemStore = state.products.find((element) => element.id === id);

  itemStore.quantity += itemCart.quantitySelected;
  state.cart.splice(state.cart.indexOf(itemCart), 1);
};

export const CLEAR_CART = (state) => {
  state.cart.forEach((element) => {
    const alterProduct = state.products.find(
      (product) => product.id === element.id
    );
    alterProduct.quantity += element.quantitySelected;
  });
  state.cart = [];
};

export const ALTER_CART_QUANTITY = (state, paylod) => {
  const item = state.cart.find((element) => element.id === paylod.id);
  const itemStore = state.products.find((element) => element.id === paylod.id);

  if (paylod.operation === "+") {
    item.quantitySelected++;
    itemStore.quantity--;
  } else if (paylod.operation === "-") {
    item.quantitySelected--;
    itemStore.quantity++;
  } else {
    console.log("Error, unknown operation");
  }
};
