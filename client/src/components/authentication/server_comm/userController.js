import axios from "axios";

export async function postSignIn(email, password) {
  const data = { email, password };
  const response = await axios.post("/login", data);
  return response.data.data;
}

export async function postCredentials(payload) {
  const response = await axios.post("/create-account", payload);
  return response.data;
}

export async function postUpdateCredentials(payload) {
  const response = await axios.put("/update-account", payload, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}

