<template>
  <div class="profile-child-container">
    <div class="list-group">
      <div
        class="list-group-item list-group-item-action list-group-item-light"
        v-for="product in userProducts"
        :key="product.id"
      >
        <router-link
          :to="'/Profile/'+userData.username+'/Update-Product-'+product.id"
          class="product-title float-left"
        >{{product.title}}</router-link>
        <div class="product-control">
          <font-awesome-icon
            class="remove-icon float-right"
            icon="times-circle"
            @click="deleteProduct(product.id)"
          />
          <span class="badge badge-primary badge-pill float-right">{{product.quantity}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getUserProducts,
  postDeleteProduct
} from "./server_comm/userController";

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
    this.getProducts();
  },
  methods: {
    async getProducts() {
      const userProducts = await getUserProducts(this.userData.id);
      if (userProducts != "error") {
        this.userProducts = userProducts;
      }
    },
    async deleteProduct(id) {
      const response = await postDeleteProduct(id);
      if (response === "deleted") {
        this.getProducts();
        this.$store.dispatch("initProducts");
      }
    }
  }
};
</script>

<style scoped>
.profile-child-container {
  margin-top: 2%;
}
.product-control {
  height: 24px;
  margin-top: 4px;
}
.product-control .remove-icon {
  margin-left: 14px;
  font-size: 20px;
  color: rgb(230, 30, 30);
}
.product-content .product-control .remove-icon:hover {
  cursor: pointer;
}
.product-title {
  text-decoration: none;
  color: black;
}
.product-title:hover {
  color: gray;
}
</style>