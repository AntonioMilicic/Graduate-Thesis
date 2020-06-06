import axios from "axios";

export async function getUserProducts(id) {
  const response = await axios.get("products/user-products/" + id);
  if (response.data.status === "success") {
    return response.data.data;
  }
  else return response.data.status;
}

export async function postUserProduct(order) {
  const response = await axios.post("products/user-product/create", order);
  return response.data.status;
}

export async function updateUserProduct(order) {
  const response = await axios.post("products/user-product/update/" + order.id, order);
  return response.data.status;
}

export async function postDeleteProduct(id) {
  const response = await axios.delete("products/user-product/delete/" + id);
  return response.data.data;
}
