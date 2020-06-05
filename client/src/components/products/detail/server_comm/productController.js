import axios from "axios";

export async function getOwnerData(productId) {
  const response = await axios.get("/users/user-by-product-Id/" + productId, productId);
  return response.data.data;
}
