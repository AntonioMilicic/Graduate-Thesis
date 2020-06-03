import axios from "axios";

export async function getProducts() {
  const response = await axios.get("products");
  return response.data.data;
}
