<template>
  <form>
    <h4>
      Please login
      <font-awesome-icon icon="lock" />
    </h4>
    <hr />
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputEmail">Email address</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="inputEmail"
          aria-describedby="emailHelp"
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>
      <div class="form-group col-md-6">
        <label for="inputPassword">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="inputPassword"
        />
      </div>
    </div>
    <button type="button" class="btn btn-primary" @click="submitLogin">
      Submit
    </button>
  </form>
</template>

<script>
import { postLogin } from "./server_communication/login";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async submitLogin() {
      // const orderInfo = {
      //   email: this.email,
      //   password: this.password
      // };
      const loginStatus = await postLogin(this.email, this.password);
      if (loginStatus == null) {
        console.log("NULL");
      } else console.log("loginStatus", loginStatus);
      // this.$store.dispatch("submitLogin_Store", orderInfo);
    },
  },
};
</script>
