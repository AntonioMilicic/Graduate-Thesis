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
    <h6 style="text-align: center" v-if="badCredentials">
      Please make sure your username and password match &#x1F615;
    </h6>
  </form>
</template>

<script>
import { postLogin } from "./server_communication/login";

export default {
  data() {
    return {
      email: "",
      password: "",
      badCredentials: false,
    };
  },
  methods: {
    async submitLogin() {
      const loginStatus = await postLogin(this.email, this.password);
      if (loginStatus === null) {
        this.email = "";
        this.password = "";
        this.badCredentials = true;
      } else {
        console.log("loginStatus", loginStatus);
        this.$store.dispatch("submitUser_Store", loginStatus);
        this.$router.push({
          path: "/profile",
          query: { user: loginStatus.username },
        });
      }
    },
  },
};
</script>
