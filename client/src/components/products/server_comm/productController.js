import axios from "axios";

export async function getOwnerData(productId) {
  const response = await axios.get("/users/user-by-product-Id/" + productId, productId);
  return response.data.data;
}

export async function postUserProduct(order) {
  const response = await axios.post("products/user-product/create", order);
  return response.data.status;
}

export async function updateUserProduct(order) {
  const response = await axios.put("products/user-product/update/" + order.id, order);
  return response.data.status;
}