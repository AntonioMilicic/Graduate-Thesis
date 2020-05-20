<template>
  <div class="header-spacer">
    <nav class="navbar navbar-expand-lg navbar-light">
      <router-link to="/">
        <a class="navbar-brand" href="#">AMCommerce</a>
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <router-link to="/" class="nav-item" active-class="active" exact tag="li">
            <a class="nav-link">
              Home
              <font-awesome-icon icon="home" />
            </a>
          </router-link>
          <router-link to="/Products" class="nav-item" active-class="active" tag="li">
            <a class="nav-link">
              Products
              <font-awesome-icon icon="archive" />
            </a>
          </router-link>
        </ul>
        <ul class="navbar-nav ml-auto">
          <router-link
            :to="profilePath"
            v-if="userName"
            class="nav-item"
            active-class="active"
            tag="li"
          >
            <a class="nav-link">
              Profile
              <font-awesome-icon icon="male" />
              <font-awesome-icon icon="female" />
            </a>
          </router-link>
          <li v-if="userName" class="nav-item" style="cursor: pointer;">
            <a class="nav-link" @click="clearStoreAccState">
              Sign-out
              <font-awesome-icon icon="sign-out-alt" />
            </a>
          </li>
          <li v-show="!userName" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Registration
              <font-awesome-icon icon="id-card-alt" />
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link to="/SignIn" class="nav-item" active-class="active" tag="li">
                <a class="dropdown-item nav-link" href="#">
                  Sign-in
                  <font-awesome-icon icon="sign-in-alt" />
                </a>
              </router-link>
              <div class="dropdown-divider"></div>
              <router-link to="/CreateAccount" class="nav-item" active-class="active" tag="li">
                <a class="dropdown-item nav-link" href="#">
                  Create Account
                  <font-awesome-icon icon="user-tie" />
                </a>
              </router-link>
            </div>
          </li>
          <router-link to="/Cart" class="nav-item" active-class="active" tag="li">
            <a class="nav-link">
              Cart
              <font-awesome-icon icon="shopping-cart" />
            </a>
          </router-link>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["userName"]),
    profilePath() {
      return "/Profile/" + this.userName;
    }
  },
  methods: {
    clearStoreAccState() {
      this.$store.dispatch("clearAccountSate_Store");
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style scoped>
.header-spacer {
  margin: 0 30px 30px 30px;
}
.nav-link {
  font-size: 18px;
}
</style>
