<template>
  <div class="row row-cols-1">
    <h1 class="empty-warning" v-if="selectedProducts.length == 0">Your cart is empty &#128527;</h1>
    <app-cart-product v-for="product in selectedProducts" :key="product.id" :cartProduct="product" />
    <div class="btn-container" v-if="!selectedProducts.length == 0">
      <button type="button" class="btn-danger float-right btn-checkout" @click="clearCart">
        Clear cart
        <font-awesome-icon icon="trash" />
      </button>
      <router-link to="/Cart/Checkout">
        <button type="button" class="btn-primary float-right btn-checkout">
          Proceed to checkout
          <font-awesome-icon icon="credit-card" />
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import cartProduct from "./cartProduct.vue";

export default {
  components: {
    appCartProduct: cartProduct
  },
  computed: {
    selectedProducts() {
      return this.$store.getters.selectedProducts;
    }
  },
  methods: {
    clearCart() {
      this.$store.dispatch("clearCart_Store");
    }
  }
};
</script>

<style scoped>
.empty-warning {
  text-align: center;
}
.btn-container {
  margin: 20px 0;
  border-radius: 10px;
}
.btn-container .btn-checkout {
  padding: 10px;
  border-radius: 10px;
  margin-right: 10px;
}
</style>