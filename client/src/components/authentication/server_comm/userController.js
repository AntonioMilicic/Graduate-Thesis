import axios from "axios";

export async function postSignIn(email, password) {
  const data = { email, password };
  const response = await axios.post("/login", data);
  return response.data.data;
}

export async function postCredentials(payload) {
  const data = { ...payload };
  const response = await axios.post("/createAccount", data);
  return response.data.status;
}

export async function postUpdateCredentials(payload) {
  const data = { ...payload };
  const response = await axios.post("/updateAccount", data);
  return response.data.status;
}
