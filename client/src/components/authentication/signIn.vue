<template>
  <div class="outer-wrapper">
    <h4>
      Please sign in
      <font-awesome-icon icon="lock" />
    </h4>
    <hr />
    <h5
      class="warning-title"
      v-if="badCredentials"
    >Please make sure your username and password match &#x1F605;</h5>

    <form>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail">Email address</label>
          <input id="inputEmail" class="form-control" type="email" v-model="email" />
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword">Password</label>
          <input
            id="inputPassword"
            class="form-control"
            :class="{'invalid-password':badCredentials}"
            type="password"
            v-model="password"
            @keyup.enter="submitSignIn"
          />
          <span id="passwordShow" class="form-text text-muted" @click="showPassword">
            <input id="checkbox" type="checkbox" aria-label="Checkbox for password show" />
            <label for="checkbox">Show password?</label>
          </span>
        </div>
      </div>
      <button class="btn btn-primary float-right" type="button" @click="submitSignIn">Submit</button>
    </form>
  </div>
</template>

<script>
import { postSignIn } from "./server_comm/userController";

export default {
  data() {
    return {
      email: "",
      password: "",
      badCredentials: false
    };
  },
  methods: {
    showPassword() {
      const checkbox = document.getElementById("checkbox");
      const passwordField = document.getElementById("inputPassword");

      if (checkbox.checked === true) {
        passwordField.type = "text";
      } else passwordField.type = "password";
    },
    async submitSignIn() {
      const signInStatus = await postSignIn(this.email, this.password);

      if (signInStatus === undefined) {
        this.password = "";
        this.badCredentials = true;
      } else {
        const path = "/Profile/" + signInStatus.username;
        this.$store.dispatch("submitUser_Store", signInStatus);
        this.$router.push({ path: path });
      }
    }
  }
};
</script>

<style scoped>
.warning-title {
  text-align: center;
}
.form-row .form-group .invalid-password {
  border: solid 1px red;
}
</style>