<template>
  <div class="user-profile-wrapper outer-container">
    <div class="container-center">
      <div class="user-data" v-show="userData.email">
        <img class="user-image" alt="user-img" :src="imgURL(userData.image)" v-if="userData.image" />
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
          <button class="btn btn-primary btn-profile-field" type="button">Update profile</button>
        </router-link>
        <router-link :to="userData.username+'/Create-Product'">
          <button class="btn btn-primary btn-profile-field" type="button">Create product</button>
        </router-link>
      </div>

      <div class="product-content">
        <h3>Products</h3>
        <hr />
        <div class="list-group">
          <router-link to="/Products">
            <button
              class="list-group-item list-group-item-action list-group-item-light"
              type="button"
              v-for="product in userProducts"
              :key="product.id"
            >
              <span class="float-left">{{product.title}}</span>
              <span class="badge badge-primary badge-pill float-right">{{product.quantity}}</span>
            </button>
          </router-link>
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
    // returns URL for image, deppending if its outer source or local image
    imgURL(url) {
      if (url[0] == "/") return require("../../assets/images" + url);
      else return url;
    },
    async getProducts() {
      const userProducts = await getUserProducts(this.userData.id);
      console.log(userProducts);
      this.userProducts = userProducts;
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
.container-center .product-content .badge {
  margin-top: 4px;
}
</style>