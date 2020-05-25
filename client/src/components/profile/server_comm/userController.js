import axios from "axios";

export async function getUserProducts(username) {
  const response = await axios.get("products/user-products/" + username);

  return response.data.data;
}
