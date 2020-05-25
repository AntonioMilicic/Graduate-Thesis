<template>
  <div class="product-detail-container">
    <div class="product-detail-center">
      <div class="product-detail-user" v-show="userData.email">
        <img v-if="userData.image" :src="imgURL(userData.image)" alt="user-img" class="user-image" />
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
        <router-link :to="userData.username+'/Update-Profile'">
          <button type="button" class="btn btn-primary btn-profile-field">Update profile</button>
        </router-link>
        <router-link :to="userData.username+'/Create-Product'">
          <button type="button" class="btn btn-primary btn-profile-field">Create product</button>
        </router-link>
      </div>
      <div class="product-content" style="width: 100%">
        <h3>Products</h3>
        <hr />
        <div class="list-group">
          <button
            v-for="product in userProducts"
            :key="product.id"
            type="button"
            class="list-group-item list-group-item-action list-group-item-light"
          >
            <span class="float-left">{{product.title}}</span>
            <span
              class="badge badge-primary badge-pill float-right"
              style="margin-top: 4px"
            >{{product.quantity}}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getUserProducts } from "./server_comm/userController";
export default {
  data() {
    return {
      userProducts: []
    };
  },
  computed: {
    ...mapGetters(["userData"])
  },
  created() {
    if (this.userData.username == "") {
      this.$router.push({
        path: "/"
      });
    } else this.getProducts();
  },
  methods: {
    imgURL(url) {
      if (url[0] == "/") return require("../../assets/images" + url);
      else return url;
    },
    async getProducts() {
      const userProducts = await getUserProducts(this.userData.username);
      this.userProducts = userProducts;
    }
  }
};
</script>

<style scoped>
.btn-profile-field {
  margin: 10px 0 10px 0;
  width: 132px;
}
</style>