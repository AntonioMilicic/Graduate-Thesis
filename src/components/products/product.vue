<template>
  <div class="col mb-2">
    <div class="card card-design">
      <router-link :to="link">
        <div class="card-img-container">
          <img class="card-img-top" alt="card-img" :src="product.imgSrc" />
        </div>
      </router-link>
      <div class="card-body">
        <h5 class="card-title">{{ product.title }}</h5>
        <hr />
        <p class="card-text">{{ product.description }}</p>
        <div>
          <p class="card-text card-price float-left">{{ product.price | currency }}</p>
          <input
            type="number"
            min="0"
            class="form-control float-right quantity-field"
            data-toggle="tooltip"
            data-placement="top"
            title="Number must be positive integer"
            placeholder="Q"
            v-model.number="quantity"
          />
        </div>
        <div class="sell-container">
          <button
            class="btn btn-success add-cart"
            @click="addToCart"
            :disabled="
              quantity === 0 ||
                quantity > product.quantity ||
                !Number.isInteger(quantity)
            "
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
      quantity: 1,
      toolTipText: "",
      link: "Products/" + this.product.id
    };
  },
  props: ["product"],
  methods: {
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
.card-title {
  text-align: center;
}
.card-price {
  color: red;
  font-size: 18px;
}
.quantity-field {
  width: 60px;
  font-size: 16px;
  background-color: rgb(243, 241, 241);
}
.card-design {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.card-design:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.card-img-container {
  width: 90%;
  height: 200px;
  margin-left: 5%;
  margin-top: 5%;
}
.card-img-top {
  max-width: 520px;
  height: 100%;
}
.add-cart {
  margin-bottom: 0;
  margin-left: 10%;
  margin-top: 10px;
  width: 80%;
  height: 40px;
}
/* Tooltip text */
.add-cart .tooltip-text {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: white;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 15%;
  left: 50%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Tooltip arrow */
.add-cart .tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black black transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.add-cart:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}

@media only screen and (max-width: 768px) {
  .add-cart {
    margin-left: auto;
  }
}
</style>
