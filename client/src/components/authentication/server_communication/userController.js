import axios from "axios";

export async function postLogin(email, password) {
  const data = { email, password };

  const response = await axios.post("/login", data);
  const responseData = response.data.data;

  return responseData;
}

export async function postCredentials(payload) {
  const data = { ...payload };

  const response = await axios.post("/create", data);
  const responseData = response.data.data;

  return responseData;
}
