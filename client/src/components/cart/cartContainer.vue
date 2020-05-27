<template>
  <div class="cart-container-wrapper row row-cols-1">
    <h1 class="empty-warning" v-if="selectedProducts.length === 0">Your cart is empty &#128527;</h1>

    <app-cart-product v-for="product in selectedProducts" :key="product.id" :cartProduct="product" />

    <div class="btn-container" v-if="selectedProducts.length !== 0">
      <button class="btn-danger btn-checkout float-right" type="button" @click="clearCart">
        Clear cart
        <font-awesome-icon icon="trash" />
      </button>

      <router-link to="/Cart/Checkout">
        <button class="btn-primary btn-checkout float-right" type="button">
          Proceed to checkout
          <font-awesome-icon icon="credit-card" />
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import cartProduct from "./CartContainerProduct.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    appCartProduct: cartProduct
  },
  computed: {
    ...mapGetters(["selectedProducts"])
  },
  methods: {
    clearCart() {
      this.$store.dispatch("clearCart_Store");
    }
  }
};
</script>

<style scoped>
.row .empty-warning {
  text-align: center;
}
.row .btn-container {
  margin: 20px 0;
  border-radius: 10px;
}
.row .btn-container .btn-checkout {
  padding: 10px;
  border-radius: 10px;
  margin-right: 10px;
}
</style>