<template>
  <div class="col mb-4">
    <div class="card card-design">
      <router-link :to="link">
        <img class="card-img-top" alt="card-img" :src="product.imgSrc" />
      </router-link>
      <div class="card-body">
        <h5 class="card-title">{{ product.title }}</h5>
        <hr />
        <p class="card-text">{{ product.description }}</p>
        <div>
          <p class="card-text card-price float-left">{{ product.price | currency }}</p>
          <input
            type="number"
            class="form-control float-right quantity-field"
            placeholder="Q"
            v-model.number="quantity"
          />
        </div>
        <div class="sell-container">
          <button
            class="btn btn-success add-cart"
            @click="addToCart"
            :disabled="
              quantity <= 0 ||
                quantity > product.quantity ||
                !Number.isInteger(quantity)
            "
          >
            <span>
              Add To Cart
              <font-awesome-icon icon="shopping-cart" />
            </span>
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
}
.card-design {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.card-design:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
}
.card-img-top {
  border-radius: 0 0 20px 20px;
  max-width: 520px;
  height: 180px;
}
.add-cart {
  margin-bottom: 0;
  margin-left: 10%;
  margin-top: 10px;
  width: 80%;
  height: 40px;
}

@media only screen and (max-width: 768px) {
  .add-cart {
    margin-left: auto;
  }
}
</style>
