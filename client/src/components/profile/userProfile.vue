<template>
  <div class="user-profile-wrapper outer-container">
    <div class="container-center">
      <div class="user-data" v-show="userData.email">
        <img class="user-image" alt="user-img" :src="imgSrc(userData.image)" v-if="imgSrc" />
        <ul class="user-detail">
          <li>
            <b>Name:</b>
            {{ userData.firstName }} {{ userData.lastName }}
          </li>
          <li>
            <b>User:</b>
            {{ userData.username }}
          </li>
          <li>
            <b>Email:</b>
            {{ userData.email }}
          </li>
          <li>
            <b>Country:</b>
            {{ userData.country }}
          </li>
          <li>
            <b>City:</b>
            {{ userData.city }}
          </li>
          <li>
            <b>Address:</b>
            {{ userData.address }}, {{ userData.houseNumber }}
          </li>
          <li>
            <b>ZIP:</b>
            {{ userData.zipCode }}
          </li>
        </ul>
        <router-link :to="'/Profile/'+userData.username+'/Update-Profile'">
          <button class="btn btn-primary btn-profile-field" type="button">Update profile</button>
        </router-link>
        <router-link :to="'/Profile/'+userData.username+'/Create-Product'">
          <button class="btn btn-primary btn-profile-field" type="button">Create product</button>
        </router-link>
      </div>

      <div class="product-content">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="'/Profile/'+userData.username+'/User-Products'"
            >Products</router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              active-class="active"
              :to="'/Profile/'+userData.username+'/User-Orders'"
            >Orders</router-link>
          </li>
        </ul>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["userData"])
  },
  created() {
    const user = localStorage.getItem("user");
    if (!this.userData.username && user) {
      this.$store.dispatch("submitUser_Store", JSON.parse(user));
    }
    if (!this.userData.username) {
      this.$router.push({ path: "/" });
    }
  },
  methods: {
    // returns URL for image, deppending if its outer source or local image
    imgSrc(url) {
      return require("../../assets/images/uploads/users/" + url);
    }
  }
};
</script>

<style scoped>
/* Class styles are inhereted from products/detail/ProductDetail */
.container-center .user-data .btn-profile-field {
  width: 132px;
  margin: 10px 0 10px 0;
}
.container-center .product-content {
  width: 100%;
}
</style>