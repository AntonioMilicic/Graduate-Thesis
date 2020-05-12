<template>
  <div class="card">
    <div class="row no-gutters">
      <div class="col-md-4 img-container">
        <img :src="cartProduct.imgSrc" class="card-img" alt="cart-image" />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h6 class="card-title">{{cartProduct.title}}</h6>
          <p class="card-text">{{cartProduct.description}}</p>
          <p class="card-text">
            <small class="text-muted">Quantity: {{cartProduct.selectedQuantity}}</small>
            <br />
            <small class="text-muted">Item Price: {{cartProduct.price | currency}}</small>
          </p>
          <span class="quantity-control float-right" @click="quantityAlt('-')">-</span>
          <span class="quantity-control float-right" @click="quantityAlt('+')">+</span>
          <hr />
          <p class="text-muted">Total Price: {{cartProduct.price * cartProduct.selectedQuantity}}</p>
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
.card-img {
  width: 100%;
  height: 100%;
}
.img-container {
  height: 232px;
}
.remove-icon {
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 20px;
  color: red;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.quantity-control {
  font-size: 32px;
  padding: 10px;
  margin-right: 20px;
}
.quantity-control:hover {
  cursor: pointer;
}
.remove-icon:hover {
  cursor: pointer;
}
.card {
  margin-bottom: 10px;
  border: solid 0.5px darkgray;
}
.card:hover {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>