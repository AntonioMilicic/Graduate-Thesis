<template>
  <div>
    <h4>
      Please enter your credentials
      <font-awesome-icon icon="user-shield" />
    </h4>
    <hr />
    <h5
      style="text-align: center"
      v-if="badCredentials"
    >Seems like account with exact username or email already exists &#x1F615;</h5>
    <form onsubmit="return false">
      <small class="form-text text-muted" style="margin: 0 0 10px 10px;">Mandatory fields</small>
      <div class="form-row">
        <div class="form-group col-md-6" v-if="showCreate">
          <label for="inputFirstName">First name</label>
          <input
            v-model="credentials.firstName"
            type="text"
            class="form-control"
            id="inputFirstName"
            required
          />
        </div>
        <div class="form-group col-md-6" v-if="showCreate">
          <label for="inputLastName">Last name</label>
          <input
            v-model="credentials.lastName"
            type="text"
            class="form-control"
            id="inputLastName"
            required
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6" v-if="showCreate">
          <label for="inputUsername">Username</label>
          <input
            v-model="credentials.username"
            type="text"
            class="form-control"
            id="inputUsername"
            required
          />
        </div>
        <div class="form-group col-md-6">
          <label for="inputEmail">Email</label>
          <input
            v-model="credentials.email"
            type="email"
            class="form-control"
            id="inputEmail"
            required
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputPassword">Password</label>
          <input
            v-model="credentials.password"
            type="password"
            class="form-control"
            id="inputPassword"
            required
          />
        </div>
        <div class="form-group col-md-6">
          <label for="inputPasswordRe">Re-enter Password</label>
          <input
            v-model="credentials.passwordRe"
            type="password"
            class="form-control"
            id="inputPasswordRe"
            required
          />
        </div>
      </div>
      <hr />
      <small class="form-text text-muted" style="margin: 0 0 10px 10px;">Optional fields</small>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputCountry">Country</label>
          <input v-model="credentials.country" id="inputCountry" type="text" class="form-control" />
        </div>
        <div class="form-group col-md-6">
          <label for="inputCity">City</label>
          <input v-model="credentials.city" type="text" class="form-control" id="inputCity" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputAddress">Address</label>
          <input
            v-model="credentials.address"
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>
        <div class="form-group col-md-4">
          <label for="inputHouseNumber">House Number</label>
          <input
            v-model="credentials.houseNumber"
            type="text"
            class="form-control"
            id="inputHouseNumber"
            placeholder="Apartment, studio, or floor"
          />
        </div>
        <div class="form-group col-md-2">
          <label for="inputZip">Zip</label>
          <input v-model="credentials.zipCode" type="text" class="form-control" id="inputZip" />
        </div>
      </div>
      <div class="form-row" style="margin-bottom: 50px;">
        <div class="form-group col-md-6">
          <label for="inputImageLocation">Profile image</label>
          <input
            v-model="credentials.image"
            type="text"
            class="form-control"
            id="inputImageLocation"
          />
        </div>
        <div class="form-group col-md-3">
          <label for="inputRole">Role code</label>
          <input v-model="credentials.role" type="text" class="form-control" id="inputRole" />
        </div>
        <div class="form-group col-md-3">
          <button
            v-if="showCreate"
            type="submit"
            style="margin-top: 32px; float: right"
            class="btn btn-primary"
            @click="submitCredentials('create')"
          >Create account</button>
          <button
            v-if="!showCreate"
            type="submit"
            style="margin-top: 32px; float: right"
            class="btn btn-primary"
            @click="submitCredentials('update')"
          >Update account</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {
  postCredentials,
  postUpdateCredentials
} from "./server_communication/userController";

export default {
  data() {
    return {
      credentials: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        passwordRe: "",
        country: "",
        city: "",
        address: "",
        houseNumber: "",
        zipCode: "",
        image: "",
        role: ""
      },
      badCredentials: false,
      showCreate: false
    };
  },
  created() {
    // Push to frontpage if user is not signed but he is on update profile page
    if (
      this.existingCredentials.username == "" &&
      this.$route.path != "/CreateAccount"
    ) {
      this.$router.push({
        path: "/"
      });
    }
    // Show update or create button
    if (this.$route.path == "/CreateAccount") {
      this.showCreate = true;
    } else this.showCreate = false;

    this.credentials = this.existingCredentials;
  },
  computed: {
    existingCredentials() {
      return this.$store.getters.userData;
    }
  },
  methods: {
    async submitCredentials(command) {
      let serverResponse = "";
      if (
        this.credentials.password != "" &&
        this.credentials.password != this.credentials.passwordRe
      ) {
        alert("Passwords must match!");
        this.credentials.password = "";
        this.credentials.passwordRe = "";
      } else if (
        this.credentials.password != "" &&
        this.credentials.passwordRe != "" &&
        this.credentials.firstName != "" &&
        this.credentials.lastName != "" &&
        this.credentials.username != "" &&
        this.credentials.email != "" &&
        this.credentials.password == this.credentials.passwordRe
      ) {
        if (command == "create") {
          serverResponse = await postCredentials(this.credentials);
        } else if (command == "update") {
          serverResponse = await postUpdateCredentials(this.credentials);
        }
        if (serverResponse == null) {
          this.badCredentials = true;
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        } else {
          this.$store.dispatch("submitUser_Store", this.credentials);

          const path = "/Profile/" + this.credentials.username;
          this.$router.push({
            path: path
          });
        }
      } else return;
    }
  }
};
</script>
