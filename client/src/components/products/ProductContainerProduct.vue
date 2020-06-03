<template>
  <div class="product-wrapper col mb-2">
    <div class="card card-design">
      <router-link :to="path">
        <div class="card-img-container">
          <img class="card-img" alt="card-img" :src="imgURL(product.imageSources[0])" />
        </div>
      </router-link>

      <div class="card-body">
        <h5 class="card-title">{{ product.title }}</h5>
        <hr />
        <p class="card-text">{{ product.description }}</p>
        <div>
          <p class="card-text card-price float-left">{{ product.price | currency }}</p>
          <input
            class="form-control float-right quantity-field"
            type="number"
            min="0"
            title="Number must be positive integer"
            data-toggle="tooltip"
            data-placement="top"
            placeholder="Q"
            v-model.number="quantity"
          />
        </div>

        <div class="sell-container">
          <button
            class="btn btn-success add-cart"
            :disabled="
              quantity === 0 ||
              quantity > product.quantity ||
              !Number.isInteger(quantity)"
            @click="addToCart"
          >
            <span>
              Add To Cart
              <font-awesome-icon icon="shopping-cart" />
            </span>
            <span class="tooltip-text" v-if="toolTip()">{{ toolTipText }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: "Products/Product-" + this.product.id,
      toolTipText: "",
      quantity: 1
    };
  },
  props: ["product"],
  methods: {
    imgURL(url) {
      if (url[0] == "/") return require("../../assets/images" + url);
      else return url;
    },
    addToCart() {
      const orderInfo = {
        productId: this.product.id,
        quantitySelected: this.quantity,
        price: this.product.price
      };

      this.$store.dispatch("addToCart_Store", orderInfo);
      this.quantity = 0;
    },
    toolTip() {
      if (this.product.quantity === 0) {
        this.toolTipText = "Empty Stock";
        return true;
      } else if (this.quantity > this.product.quantity) {
        this.toolTipText = "Not enough products on stock";
        return true;
      } else if (this.quantity === 0) {
        this.toolTipText = "Set item quantity";
        return true;
      } else return false;
    }
  }
};
</script>

<style scoped>
.col {
  padding: 0 5px;
}
.card-design {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.card-design:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.card .card-img-container {
  width: 90%;
  height: 200px;
  margin-top: 5%;
  margin-left: 5%;
}
.card .card-img-container .card-img {
  max-width: 520px;
  height: 100%;
}
.card .card-body .card-title {
  text-align: center;
}
.card .card-body .card-price {
  color: red;
  font-size: 18px;
}
.card .card-body .quantity-field {
  width: 60px;
  font-size: 16px;
  background-color: rgb(243, 241, 241);
}
.card .sell-container .add-cart {
  width: 80%;
  height: 40px;
  margin-bottom: 0;
  margin-left: 10%;
  margin-top: 10px;
}
.card .sell-container .add-cart .tooltip-text {
  visibility: hidden;
  z-index: 1;
  position: absolute;
  bottom: 15%;
  left: 50%;
  width: 120px;
  padding: 5px 0;
  margin-left: -60px;
  border-radius: 6px;
  text-align: center;
  color: white;
  background-color: black;
  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}
.card .sell-container .add-cart .tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black black transparent transparent;
}
.card .sell-container .add-cart:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
@media only screen and (max-width: 768px) {
  .add-cart {
    margin-left: auto;
  }
}
</style>
