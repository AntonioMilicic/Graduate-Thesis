<template>
  <form>
    <h4>
      Please sign in
      <font-awesome-icon icon="lock" />
    </h4>
    <h6
      style="text-align: center"
      v-if="badCredentials"
    >Please make sure your username and password match &#x1F615;</h6>
    <hr />
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputEmail">Email address</label>
        <input v-model="email" type="email" class="form-control" id="inputEmail" />
      </div>
      <div class="form-group col-md-6">
        <label for="inputPassword">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          :class="{'invalid-password':badCredentials}"
          id="inputPassword"
          @keyup.enter="submitSignIn"
        />
        <span id="passwordShow" class="form-text text-muted" @click="showPassword">
          <input id="checkbox" type="checkbox" aria-label="Checkbox for password show" />
          <label for="checkbox">Show password?</label>
        </span>
      </div>
    </div>
    <button type="button" class="btn btn-primary float-right" @click="submitSignIn">Submit</button>
  </form>
</template>

<script>
import { postSignIn } from "./server_communication/userController";

export default {
  data() {
    return {
      email: "",
      password: "",
      badCredentials: false
    };
  },
  methods: {
    async submitSignIn() {
      const signInStatus = await postSignIn(this.email, this.password);
      if (signInStatus === undefined) {
        this.password = "";
        this.badCredentials = true;
      } else {
        const path = "/Profile/" + signInStatus.username;
        this.$store.dispatch("submitUser_Store", signInStatus);
        this.$router.push({
          path: path
        });
      }
    },
    showPassword() {
      const checkbox = document.getElementById("checkbox");
      const passwordField = document.getElementById("inputPassword");
      if (checkbox.checked === true) {
        passwordField.type = "text";
      } else passwordField.type = "password";
    }
  }
};
</script>

<style scoped>
.invalid-password {
  border: solid 1px red;
}
</style>