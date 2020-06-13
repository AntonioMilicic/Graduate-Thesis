import axios from "axios";

export async function postOrder(payload) {
  const data = { ...payload };
  const response = await axios.post("/create-order", data);
  console.log(response);
  return response.data.response;
}
