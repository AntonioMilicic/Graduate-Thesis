<template>
  <div class="cart-product-wrapper card">
    <div class="row no-gutters">
      <div class="col-md-4 img-container">
        <router-link :to="path">
          <img class="card-img" alt="cart-image" :src="imgSrc(cartProduct.imageSources[0])" />
        </router-link>
      </div>

      <div class="col-md-8">
        <div class="card-body">
          <h6 class="card-title">{{ cartProduct.title }}</h6>
          <p class="card-text">{{ cartProduct.description }}</p>
          <p class="card-text">
            <small class="text-muted">Quantity: {{ cartProduct.selectedQuantity }}</small>
            <br />
            <small class="text-muted">Item Price: {{ cartProduct.price | currency }}</small>
          </p>
          <span class="quantity-control float-right" @click="quantityAlt('-')">-</span>
          <span class="quantity-control float-right" @click="quantityAlt('+')">+</span>
          <hr />
          <p
            class="text-muted"
          >Total Price: {{ cartProduct.price * cartProduct.selectedQuantity | currency}}</p>
        </div>
      </div>

      <font-awesome-icon class="remove-icon" icon="times-circle" @click="removeCartItem" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      path: "Products/Product-" + this.cartProduct.id
    };
  },
  props: ["cartProduct"],
  computed: {
    getCart() {
      return this.$store.getters.cart;
    }
  },
  methods: {
    ...mapActions({
      removeItem: "removeFromCart_Store",
      quantityAlter: "quantityAlter_Store"
    }),
    imgSrc(url) {
      if (url[0] == "/") return require("../../assets/images" + url);
      else return url;
    },
    removeCartItem() {
      this.removeItem(this.cartProduct.id);
      this.sessionCartController();
    },
    quantityAlt(value) {
      const order = { operation: value, id: this.cartProduct.id };
      this.quantityAlter(order);
      this.sessionCartController();
    },
    sessionCartController() {
      if (sessionStorage.getItem("cart") != null) {
        sessionStorage.removeItem("cart");
      }
      sessionStorage.setItem("cart", JSON.stringify(this.getCart));
    }
  }
};
</script>

<style scoped>
.card {
  margin-bottom: 10px;
  border: solid 0.5px darkgray;
}
.card:hover {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.card .row .img-container {
  height: 232px;
}
.card .row .img-container .card-img {
  width: 100%;
  height: 100%;
}
.card .row .card-body .quantity-control {
  padding: 10px;
  margin-right: 20px;
  font-size: 32px;
}
.card .row .card-body .quantity-control:hover {
  cursor: pointer;
}
.card .row .remove-icon {
  position: absolute;
  top: -5px;
  right: -5px;
  border-radius: 20px;
  font-size: 20px;
  color: red;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.card .row .remove-icon:hover {
  cursor: pointer;
}
</style>
