<template>
  <div class="cart-product-wrapper card">
    <div class="row no-gutters">
      <div class="col-md-4 img-container">
        <img class="card-img" alt="cart-image" :src="imgURL(cartProduct.imageSources[0])" />
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
          <p class="text-muted">Total Price: {{ cartProduct.price * cartProduct.selectedQuantity }}</p>
        </div>
      </div>

      <font-awesome-icon class="remove-icon" icon="times-circle" @click="removeCartItem" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["cartProduct"],
  methods: {
    ...mapActions({
      removeItem: "removeFromCart_Store",
      quantityAlter: "quantityAlter_Store"
    }),
    imgURL(url) {
      if (url[0] == "/") return require("../../assets/images" + url);
      else return url;
    },
    removeCartItem() {
      this.removeItem(this.cartProduct.id);
    },
    quantityAlt(value) {
      const order = { operation: value, id: this.cartProduct.id };
      this.quantityAlter(order);
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
