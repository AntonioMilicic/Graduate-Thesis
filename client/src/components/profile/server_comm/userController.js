import axios from "axios";

export async function getUserProducts(username) {
  const response = await axios.get("products/user-products/" + username);

  return response.data.data;
}

export async function postUserProduct(order) {
  const response = await axios.post("products/user-product/create", order);
  console.log(response.data.status);
  return response.data.status;
}
