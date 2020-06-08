export const products = (state) => {
  const availableProducts = state.products.filter(
    (element) => element.quantity > 0
  );
  return availableProducts;
};

export const productDetail = (state) => (id) => {
  return state.products.find(element => element.id == id);
};

export const selectedProducts = (state) => {
  return state.cart.map((product) => {
    const selected = state.products.find(
      (element) => element.id === product.id
    );
    return {
      ...selected,
      selectedQuantity: product.quantitySelected,
    };
  });
};

export const cart = (state) => {
  return state.cart;
};

export const categories = (state) => {
  let categoryList = [];

  state.products.forEach((element) => {
    categoryList.push(element.category);
  });
  categoryList = categoryList.sort();
  return [...new Set(categoryList)];
};
