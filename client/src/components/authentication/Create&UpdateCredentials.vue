<template>
  <div class="create-update-account-wrapper">
    <div class="title-area">
      <font-awesome-icon
        class="float-left icon-back"
        icon="arrow-left"
        title="Back to Profile"
        data-toggle="tooltip"
        data-placement="top"
        v-if="!showCreate"
        @click="backToProfile"
      />
      <h4 class="title">
        Please enter your credentials
        <font-awesome-icon icon="user-shield" />
      </h4>
      <hr />
      <h5
        class="warning-title"
        v-if="badCredentials"
      >Seems like account with exact username or email already exists &#x1F605;</h5>
    </div>

    <form id="form" onsubmit="return false">
      <small class="form-text text-muted small-text-style">Mandatory fields</small>
      <div class="form-row" v-if="showCreate">
        <div class="form-group col-md-6">
          <label for="inputFirstName">First name</label>
          <input
            id="inputFirstName"
            class="form-control"
            type="text"
            required
            v-model="credentials.firstName"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="inputLastName">Last name</label>
          <input
            id="inputLastName"
            class="form-control"
            type="text"
            required
            v-model="credentials.lastName"
          />
        </div>
      </div>

      <div class="form-row" v-if="showCreate">
        <div class="form-group col-md-6">
          <label for="inputUsername">Username</label>
          <input
            id="inputUsername"
            class="form-control"
            :class="{ 'invalid-credentials': badCredentials }"
            type="text"
            required
            v-model="credentials.username"
            @change="badCredentials = false"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="inputEmail">Email</label>
          <input
            id="inputEmail"
            class="form-control"
            :class="{ 'invalid-credentials': badCredentials }"
            type="email"
            required
            v-model="credentials.email"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputPassword">Password</label>
          <input
            id="inputPassword"
            class="form-control inputPassword"
            :class="{ 'invalid-credentials': badPassword || badCredentials }"
            type="password"
            pattern="[A-Za-z0-9]{4,20}"
            required
            v-model="credentials.password"
            @change="badPassword = false"
          />
          <span id="passwordShow" class="form-text text-muted" @click="showPassword">
            <input id="checkbox" aria-label="Reveal password checkbox" type="checkbox" />
            <label for="checkbox">Show password?</label>
          </span>
        </div>
        <div class="form-group col-md-6">
          <label for="inputPasswordRe">Re-enter Password</label>
          <input
            id="inputPasswordRe"
            class="form-control inputPassword"
            :class="{ 'invalid-credentials': badPassword || badCredentials }"
            type="password"
            pattern="[A-Za-z0-9]{4,20}"
            required
            v-model="credentials.passwordRe"
          />
        </div>
      </div>
      <hr />

      <small class="form-text text-muted small-text-style">Optional fields</small>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputCountry">Country</label>
          <input id="inputCountry" class="form-control" type="text" v-model="credentials.country" />
        </div>
        <div class="form-group col-md-6">
          <label for="inputCity">City</label>
          <input id="inputCity" class="form-control" type="text" v-model="credentials.city" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputAddress">Address</label>
          <input
            id="inputAddress"
            class="form-control"
            type="text"
            placeholder="1234 Main St"
            v-model="credentials.address"
          />
        </div>
        <div class="form-group col-md-4">
          <label for="inputHouseNumber">House Number</label>
          <input
            id="inputHouseNumber"
            class="form-control"
            type="text"
            placeholder="Apartment, studio, or floor"
            v-model="credentials.houseNumber"
          />
        </div>
        <div class="form-group col-md-2">
          <label for="inputZip">Zip</label>
          <input id="inputZip" class="form-control" type="text" v-model="credentials.zipCode" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputImageLocation">Profile image</label>
          <input
            id="inputImageLocation"
            class="form-control"
            type="text"
            v-model="credentials.image"
          />
        </div>
        <div class="form-group col-md-3">
          <label for="inputRole">Role code</label>
          <input id="inputRole" class="form-control" type="text" v-model="credentials.role" />
        </div>
        <div class="form-group col-md-3">
          <button
            class="btn btn-primary submit-button"
            type="submit"
            v-if="showCreate"
          >Create account</button>
          <button
            class="btn btn-primary submit-button"
            type="submit"
            v-if="!showCreate"
          >Update account</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  postCredentials,
  postUpdateCredentials
} from "./server_comm/userController";

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
      badPassword: false,
      showCreate: false
    };
  },
  created() {
    // Push to frontpage if user is not signed but he is on update profile page(replace with router guard?)
    if (!this.user.username && this.$route.path !== "/CreateAccount") {
      this.$router.push({ path: "/" });
    } else {
      // Show update or create button and set credentials to existing ones
      if (this.$route.path === "/CreateAccount") {
        this.showCreate = true;
      } else this.showCreate = false;

      this.credentials = { ...this.user };
    }
  },
  mounted() {
    // Event listener for form submittion
    const form = document.getElementById("form");
    form.addEventListener("submit", this.submitCredentials);
  },
  computed: {
    ...mapGetters({ user: "userData" })
  },
  methods: {
    backToProfile() {
      this.$router.go(-1);
    },
    showPassword() {
      const checkbox = document.getElementById("checkbox");
      const passwordField = document.getElementsByClassName("inputPassword");

      if (checkbox.checked) {
        passwordField.forEach(element => (element.type = "text"));
      } else {
        passwordField.forEach(element => (element.type = "password"));
      }
    },
    async submitCredentials() {
      // submit credentials, depending if its create page or update page
      const create = this.showCreate;
      const data = this.credentials;
      let serverResponse = "";

      if (data.password !== data.passwordRe) {
        alert("Passwords must match!");
        data.password = "";
        data.passwordRe = "";
        this.badPassword = true;
      } else {
        if (create) {
          serverResponse = await postCredentials(data);
        } else if (!create) {
          serverResponse = await postUpdateCredentials(data);
        }
        // error
        if (serverResponse.status === "error") {
          this.badCredentials = true;
          document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
        // Success
        else {
          const path = "/Profile/" + data.username;
          delete data.passwordRe;
          delete data.password;
          if (create) {
            data.id = serverResponse.data;
          }

          this.$store.dispatch("submitUser_Store", data);
          localStorage.setItem("user", JSON.stringify(data));
          this.$router.push({ path: path });
        }
      }
    }
  }
};
</script>

<style scoped>
.title-area .icon-back {
  font-size: 32px;
}
.title-area .icon-back:hover {
  cursor: pointer;
}
.title-area .title {
  text-align: center;
}
.title-area .warning-title {
  text-align: center;
}
.form-row .form-group .invalid-credentials {
  border: solid 1px red;
}
.small-text-style {
  margin: 0 0 10px 10px;
}
.form-row:last-child {
  margin-bottom: 50px;
}
.form-row .form-group .submit-button {
  float: right;
  margin-top: 32px;
}
</style>
